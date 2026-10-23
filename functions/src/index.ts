import { createHash } from 'node:crypto';
import { getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret, defineString } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { z } from 'zod';

if (!getApps().length) initializeApp();

const db = getFirestore();
const resendApiKey = defineSecret('RESEND_API_KEY');
const rateLimitSalt = defineSecret('RATE_LIMIT_SALT');
const resendFromEmail = defineString('RESEND_FROM_EMAIL');
const allowedOrigins = defineString('ALLOWED_ORIGINS', {
  default: 'http://localhost:5173,http://127.0.0.1:5173'
});

const recipientEmail = 'alsadqmustafa88@gmail.com';
const products = ['gum-arabic', 'frankincense', 'hibiscus', 'tasali', 'tamarind', 'sesame', 'gudeim'] as const;
const productLabels: Record<(typeof products)[number], string> = {
  'gum-arabic': 'Gum Arabic / الصمغ العربي',
  frankincense: 'Frankincense / صمغ اللبان',
  hibiscus: 'Hibiscus / الكركديه',
  tasali: 'Watermelon Seeds / التسالي',
  tamarind: 'Tamarind / العرديب',
  sesame: 'Sesame / السمسم',
  gudeim: 'Gudeim / القضيم'
};

const inquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30).regex(/^[+\d\s().-]+$/),
  email: z.string().trim().email().max(254).nullable(),
  product: z.enum(products),
  quantity: z.string().trim().max(100).nullable(),
  inquiryType: z.enum(['domestic', 'export']),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(),
  requestId: z.string().uuid(),
  formStartedAt: z.number().int().positive(),
  source: z.literal('website')
}).strict();

type InquiryInput = z.infer<typeof inquirySchema>;
type EmailInquiry = Pick<InquiryInput, 'fullName' | 'phone' | 'email' | 'product' | 'quantity' | 'inquiryType' | 'message'>;
type EmailStatus = 'pending' | 'sending' | 'sent' | 'failed';

class RateLimitError extends Error {}

const cleanText = (value: string) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character] ?? character));

const getClientIp = (headers: Record<string, unknown>, fallback?: string) => {
  const forwarded = headers['x-forwarded-for'];
  const first = typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined;
  return first || fallback || 'unknown';
};

const applyRateLimit = async (ip: string) => {
  const hash = createHash('sha256').update(`${rateLimitSalt.value()}:${ip}`).digest('hex');
  const ref = db.collection('_inquiryRateLimits').doc(hash);
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maximum = 5;

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data() as { count?: number; windowStartedAt?: Timestamp } | undefined;
    const windowStartedAt = data?.windowStartedAt?.toMillis() ?? 0;
    const withinWindow = now - windowStartedAt < windowMs;
    const count = withinWindow ? (data?.count ?? 0) : 0;
    if (count >= maximum) throw new RateLimitError('rate_limited');

    transaction.set(ref, {
      count: count + 1,
      windowStartedAt: withinWindow ? data?.windowStartedAt : Timestamp.fromMillis(now),
      expiresAt: Timestamp.fromMillis(now + 24 * 60 * 60 * 1000)
    }, { merge: true });
  });
};

const buildEmailHtml = (inquiry: EmailInquiry, submittedAt: string) => {
  const rows = [
    ['Customer name', inquiry.fullName],
    ['Phone / WhatsApp', inquiry.phone],
    ['Email', inquiry.email || 'Not provided'],
    ['Product', productLabels[inquiry.product]],
    ['Requested quantity', inquiry.quantity || 'Not provided'],
    ['Inquiry type', inquiry.inquiryType === 'export' ? 'Export Inquiry' : 'Domestic Supply'],
    ['Submission time', submittedAt]
  ];
  const tableRows = rows.map(([label, value]) => `<tr><td style="padding:10px 14px;border-bottom:1px solid #e6ece7;color:#617067;font-size:13px">${escapeHtml(label)}</td><td style="padding:10px 14px;border-bottom:1px solid #e6ece7;color:#15251d;font-weight:600;font-size:14px">${escapeHtml(value)}</td></tr>`).join('');

  return `<!doctype html><html><body style="margin:0;background:#f5f3eb;font-family:Arial,sans-serif;color:#202a25"><div style="max-width:680px;margin:0 auto;padding:32px 16px"><div style="background:#123d2c;border-radius:18px 18px 0 0;padding:26px;color:#fff"><div style="font-size:12px;letter-spacing:1.5px;color:#d8bb7a;text-transform:uppercase">Wad Tamim for Crops</div><h1 style="margin:8px 0 0;font-size:25px">New crop inquiry</h1></div><div style="background:#fff;border-radius:0 0 18px 18px;overflow:hidden"><table style="width:100%;border-collapse:collapse">${tableRows}</table><div style="padding:22px 14px"><div style="font-size:13px;color:#617067;margin-bottom:8px">Message / additional details</div><div style="white-space:pre-wrap;line-height:1.65;background:#f4f8f5;border-radius:12px;padding:16px">${escapeHtml(inquiry.message)}</div></div></div><p style="margin:18px 4px 0;color:#778079;font-size:12px;line-height:1.5">This notification was generated by the secure Wad Tamim website inquiry function.</p></div></body></html>`;
};

const claimEmailAttempt = async (inquiryId: string) => {
  const ref = db.collection('inquiries').doc(inquiryId);
  const now = Date.now();
  const leaseMs = 2 * 60 * 1000;
  const maximumAttempts = 3;

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists) throw new Error('inquiry_not_found');

    const status = snapshot.get('emailStatus') as EmailStatus | undefined;
    const attempts = Number(snapshot.get('emailAttempts') ?? 0);
    const attemptedAt = snapshot.get('emailAttemptedAt') as Timestamp | undefined;
    const activeLease = status === 'sending' && attemptedAt && now - attemptedAt.toMillis() < leaseMs;

    if (status === 'sent' || activeLease || attempts >= maximumAttempts) return false;

    transaction.update(ref, {
      emailStatus: 'sending',
      emailAttemptedAt: FieldValue.serverTimestamp(),
      emailAttempts: attempts + 1,
      emailError: FieldValue.delete()
    });
    return true;
  });
};

const sendEmail = async (inquiryId: string, inquiry: EmailInquiry): Promise<EmailStatus> => {
  const submittedAt = new Date().toISOString();
  const ref = db.collection('inquiries').doc(inquiryId);
  const claimed = await claimEmailAttempt(inquiryId);
  if (!claimed) {
    const snapshot = await ref.get();
    return (snapshot.get('emailStatus') as EmailStatus | undefined) ?? 'pending';
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey.value()}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `wad-tamim-inquiry-${inquiryId}`
      },
      body: JSON.stringify({
        from: resendFromEmail.value(),
        to: [recipientEmail],
        reply_to: inquiry.email || undefined,
        subject: `New ${inquiry.inquiryType === 'export' ? 'export' : 'domestic'} inquiry — ${productLabels[inquiry.product]}`,
        html: buildEmailHtml(inquiry, submittedAt)
      }),
      signal: AbortSignal.timeout(12_000)
    });

    const responseBody = await response.json().catch(() => ({})) as { id?: string; message?: string };
    if (!response.ok || !responseBody.id) throw new Error(`resend_${response.status}`);
    await ref.update({ emailStatus: 'sent', emailSentAt: FieldValue.serverTimestamp(), emailProviderId: responseBody.id, emailError: FieldValue.delete() });
    return 'sent';
  } catch (error) {
    await ref.update({ emailStatus: 'failed', emailError: 'delivery_failed' });
    throw error;
  }
};

export const submitInquiry = onRequest({
  region: 'africa-south1',
  timeoutSeconds: 30,
  memory: '256MiB',
  maxInstances: 10,
  concurrency: 20,
  secrets: [resendApiKey, rateLimitSalt]
}, async (request, response) => {
  response.set('Cache-Control', 'no-store');
  response.set('X-Content-Type-Options', 'nosniff');

  const origin = request.get('origin');
  const origins = allowedOrigins.value().split(',').map((value) => value.trim()).filter(Boolean);
  if (origin && origins.includes(origin)) {
    response.set('Access-Control-Allow-Origin', origin);
    response.set('Vary', 'Origin');
  } else if (origin && !origins.includes(origin)) {
    response.status(403).json({ ok: false, message: 'origin_not_allowed' });
    return;
  }
  response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (request.method === 'OPTIONS') {
    response.status(204).send('');
    return;
  }
  if (request.method !== 'POST') {
    response.set('Allow', 'POST');
    response.status(405).json({ ok: false, message: 'method_not_allowed' });
    return;
  }

  const contentLength = Number(request.get('content-length') || 0);
  if (contentLength > 15_000 || JSON.stringify(request.body ?? {}).length > 15_000) {
    response.status(413).json({ ok: false, message: 'request_too_large' });
    return;
  }

  const parsed = inquirySchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ ok: false, message: 'invalid_inquiry' });
    return;
  }

  const elapsed = Date.now() - parsed.data.formStartedAt;
  if (parsed.data.website || elapsed < 2_500 || elapsed > 24 * 60 * 60 * 1000) {
    response.status(400).json({ ok: false, message: 'spam_check_failed' });
    return;
  }

  const inquiry: InquiryInput = {
    ...parsed.data,
    fullName: cleanText(parsed.data.fullName),
    phone: cleanText(parsed.data.phone),
    email: parsed.data.email ? cleanText(parsed.data.email).toLowerCase() : null,
    quantity: parsed.data.quantity ? cleanText(parsed.data.quantity) : null,
    message: cleanText(parsed.data.message)
  };
  const ref = db.collection('inquiries').doc(inquiry.requestId);

  try {
    const existing = await ref.get();
    if (existing.exists) {
      const storedInquiry = existing.data() as EmailInquiry;
      let emailStatus = (existing.get('emailStatus') as EmailStatus | undefined) ?? 'pending';
      if (emailStatus !== 'sent') {
        try {
          emailStatus = await sendEmail(ref.id, storedInquiry);
        } catch (emailError) {
          emailStatus = 'failed';
          logger.error('Inquiry email retry failed', { inquiryId: ref.id, error: emailError instanceof Error ? emailError.message : 'unknown' });
        }
      }
      response.status(200).json({ ok: true, inquiryId: ref.id, emailStatus, duplicate: true });
      return;
    }

    const ip = getClientIp(request.headers, request.ip);
    await applyRateLimit(ip);
    await ref.create({
      id: ref.id,
      fullName: inquiry.fullName,
      phone: inquiry.phone,
      email: inquiry.email,
      product: inquiry.product,
      quantity: inquiry.quantity,
      inquiryType: inquiry.inquiryType,
      message: inquiry.message,
      createdAt: FieldValue.serverTimestamp(),
      emailStatus: 'pending',
      emailAttempts: 0,
      emailSentAt: null,
      source: inquiry.source,
      status: 'new'
    });

    try {
      const emailStatus = await sendEmail(ref.id, inquiry);
      response.status(201).json({ ok: true, inquiryId: ref.id, emailStatus });
    } catch (emailError) {
      logger.error('Inquiry email delivery failed', { inquiryId: ref.id, error: emailError instanceof Error ? emailError.message : 'unknown' });
      response.status(201).json({ ok: true, inquiryId: ref.id, emailStatus: 'failed' });
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      response.set('Retry-After', '600');
      response.status(429).json({ ok: false, message: 'rate_limited' });
      return;
    }
    logger.error('Inquiry submission failed', { error: error instanceof Error ? error.message : 'unknown' });
    response.status(500).json({ ok: false, message: 'inquiry_not_saved' });
  }
});
