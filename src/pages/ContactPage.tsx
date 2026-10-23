import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Mail, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { ButtonLink } from '../components/ButtonLink';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { isProductSlug, products } from '../data/products';
import { buildWhatsAppUrl, CONTACT } from '../lib/constants';
import type { InquiryFormValues, InquiryResponse } from '../types/inquiry';

type SubmissionState =
  | { kind: 'idle' }
  | { kind: 'saved'; emailStatus: InquiryResponse['emailStatus'] }
  | { kind: 'error'; messageKey: 'contact.configError' | 'contact.serverError' | 'contact.requestIdError' };

export function ContactPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const queryProduct = searchParams.get('product');
  const initialProduct = isProductSlug(queryProduct) ? queryProduct : '';
  const formStartedAt = useRef(Date.now());
  const requestIdRef = useRef<string | null>(null);
  const [submission, setSubmission] = useState<SubmissionState>({ kind: 'idle' });

  const schema = useMemo(() => z.object({
    fullName: z.string().trim().min(2, t('contact.validations.nameRequired')).max(120, t('contact.validations.nameLong')),
    phone: z.string().trim().min(7, t('contact.validations.phoneRequired')).max(30, t('contact.validations.phoneRequired')).regex(/^[+\d\s().-]+$/, t('contact.validations.phoneRequired')),
    email: z.union([z.literal(''), z.string().trim().email(t('contact.validations.emailInvalid'))]).optional(),
    product: z.enum(['gum-arabic', 'frankincense', 'hibiscus', 'tasali', 'tamarind', 'sesame', 'gudeim'], { error: t('contact.validations.productRequired') }).or(z.literal('').refine(() => false, t('contact.validations.productRequired'))),
    quantity: z.string().trim().max(100, t('contact.validations.quantityLong')).optional(),
    inquiryType: z.enum(['domestic', 'export'], { error: t('contact.validations.typeRequired') }),
    message: z.string().trim().min(10, t('contact.validations.messageRequired')).max(2000, t('contact.validations.messageLong')),
    website: z.string().max(0, t('contact.honeypot')).optional()
  }), [t]);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<InquiryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', phone: '', email: '', product: initialProduct, quantity: '', inquiryType: 'domestic', message: '', website: '' }
  });

  const values = watch();
  const selectedProductName = values.product ? t(`products.${values.product}.name`) : t('contact.notProvided');
  const inquiryTypeName = t(values.inquiryType === 'export' ? 'contact.export' : 'contact.domestic');
  const whatsappMessage = t('contact.whatsappMessage', {
    name: values.fullName || t('contact.notProvided'),
    phone: values.phone || t('contact.notProvided'),
    product: selectedProductName,
    quantity: values.quantity || t('contact.notProvided'),
    type: inquiryTypeName,
    message: values.message || t('contact.notProvided')
  });

  const onSubmit = async (data: InquiryFormValues) => {
    setSubmission({ kind: 'idle' });
    const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT;
    if (!endpoint) {
      setSubmission({ kind: 'error', messageKey: 'contact.configError' });
      return;
    }

    if (!requestIdRef.current) {
      try {
        requestIdRef.current = crypto.randomUUID();
      } catch {
        setSubmission({ kind: 'error', messageKey: 'contact.requestIdError' });
        return;
      }
    }
    const requestId = requestIdRef.current;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, email: data.email || null, quantity: data.quantity || null, requestId, formStartedAt: formStartedAt.current, source: 'website' }),
        signal: controller.signal
      });
      const result = (await response.json().catch(() => ({}))) as InquiryResponse;
      if (!response.ok || !result.ok) throw new Error(result.message ?? 'submission_failed');
      setSubmission({ kind: 'saved', emailStatus: result.emailStatus });
    } catch {
      setSubmission({ kind: 'error', messageKey: 'contact.serverError' });
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const inputError = (name: keyof InquiryFormValues) => errors[name]?.message;

  return (
    <>
      <Seo titleKey="contact.seoTitle" descriptionKey="contact.seoDescription" image="/media/operations/warehouse-sacks-03.webp" imageAltKey="common.imageAltHibiscus" />
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.heroTitle')} text={t('contact.heroText')} image="/media/operations/warehouse-sacks-03.webp" alt={t('common.imageAltHibiscus')} objectPosition="center 48%">
        <ButtonLink to="/products" variant="light" arrow>{t('common.exploreProducts')}</ButtonLink>
      </PageHero>

      <section className="section-space">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <div className="card-surface p-6 sm:p-9 lg:p-10">
            <p className="eyebrow">{t('contact.formKicker')}</p>
            <h2 className="text-3xl font-extrabold text-forest-950 sm:text-4xl dark:text-white">{t('contact.formTitle')}</h2>
            <p className="mt-4 leading-7 text-stone-600 dark:text-stone-300">{t('contact.formText')}</p>

            {submission.kind === 'saved' && (
              <div className="mt-7 flex gap-3 rounded-2xl border border-emerald-600/25 bg-emerald-50 p-4 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100" role="status">
                <CheckCircle2 className="mt-0.5 shrink-0" size={22} />
                <div><p className="font-extrabold">{t('contact.successTitle')}</p><p className="mt-1 text-sm leading-6">{t(submission.emailStatus === 'sent' ? 'contact.successEmailSent' : 'contact.successEmailPending')}</p></div>
              </div>
            )}
            {submission.kind === 'error' && (
              <div className="mt-7 flex gap-3 rounded-2xl border border-red-600/20 bg-red-50 p-4 text-red-900 dark:bg-red-950/40 dark:text-red-100" role="alert">
                <AlertCircle className="mt-0.5 shrink-0" size={22} />
                <div><p className="font-extrabold">{t('contact.errorTitle')}</p><p className="mt-1 text-sm leading-6">{t(submission.messageKey)}</p></div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
              <div className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true"><label>{t('contact.website')}<input tabIndex={-1} autoComplete="off" {...register('website')} /></label></div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div><label className="label" htmlFor="fullName">{t('contact.fullName')} *</label><input className="field" id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} {...register('fullName')} />{inputError('fullName') && <p className="error-text">{inputError('fullName')}</p>}</div>
                <div><label className="label" htmlFor="phone">{t('contact.phone')} *</label><input className="field" id="phone" dir="ltr" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register('phone')} />{inputError('phone') && <p className="error-text">{inputError('phone')}</p>}</div>
              </div>
              <div><label className="label" htmlFor="email">{t('contact.email')} <span className="font-normal text-stone-400">({t('contact.optional')})</span></label><input className="field" id="email" dir="ltr" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email')} />{inputError('email') && <p className="error-text">{inputError('email')}</p>}</div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div><label className="label" htmlFor="product">{t('contact.product')} *</label><select className="field" id="product" aria-invalid={!!errors.product} {...register('product')}><option value="">{t('contact.chooseProduct')}</option>{products.map((product) => <option key={product.slug} value={product.slug}>{t(`products.${product.slug}.name`)}</option>)}</select>{inputError('product') && <p className="error-text">{inputError('product')}</p>}</div>
                <div><label className="label" htmlFor="quantity">{t('contact.quantity')} <span className="font-normal text-stone-400">({t('contact.optional')})</span></label><input className="field" id="quantity" placeholder={t('contact.quantityPlaceholder')} aria-invalid={!!errors.quantity} {...register('quantity')} />{inputError('quantity') && <p className="error-text">{inputError('quantity')}</p>}</div>
              </div>
              <fieldset><legend className="label">{t('contact.inquiryType')} *</legend><div className="grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest-900/15 p-4 transition has-[:checked]:border-forest-800 has-[:checked]:bg-sage dark:border-white/15 dark:has-[:checked]:border-gold dark:has-[:checked]:bg-white/10"><input type="radio" value="domestic" className="h-4 w-4 accent-forest-800" {...register('inquiryType')} /><span className="text-sm font-bold">{t('contact.domestic')}</span></label><label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-forest-900/15 p-4 transition has-[:checked]:border-forest-800 has-[:checked]:bg-sage dark:border-white/15 dark:has-[:checked]:border-gold dark:has-[:checked]:bg-white/10"><input type="radio" value="export" className="h-4 w-4 accent-forest-800" {...register('inquiryType')} /><span className="text-sm font-bold">{t('contact.export')}</span></label></div></fieldset>
              <div><label className="label" htmlFor="message">{t('contact.message')} *</label><textarea className="field min-h-36 resize-y" id="message" placeholder={t('contact.messagePlaceholder')} aria-invalid={!!errors.message} {...register('message')} />{inputError('message') && <p className="error-text">{inputError('message')}</p>}</div>
              <div className="flex flex-col gap-3 sm:flex-row"><button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest-900 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gold dark:text-forest-950 dark:hover:bg-[#d8bb7a]"><Send size={17} />{isSubmitting ? t('common.loading') : t('contact.submit')}</button><a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-forest-900/20 px-6 py-3 text-center text-sm font-extrabold text-forest-950 transition hover:bg-sage dark:border-white/20 dark:text-white dark:hover:bg-white/10"><MessageCircle size={18} />{t('contact.whatsappInstead')}</a></div>
              <p className="flex items-start gap-2 text-xs leading-5 text-stone-500 dark:text-stone-400"><ShieldCheck className="mt-0.5 shrink-0" size={15} />{t('contact.privacy')}</p>
            </form>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-soft sm:p-9">
              <p className="eyebrow !text-gold">{t('contact.directKicker')}</p><h2 className="text-3xl font-extrabold">{t('contact.directTitle')}</h2><p className="mt-4 leading-7 text-stone-300">{t('contact.directText')}</p>
              <div className="mt-8 space-y-3">
                <a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-forest-950"><Phone size={20} /></span><span><span className="block text-xs text-stone-400">{t('common.phone')}</span><span className="mt-0.5 block font-bold" dir="ltr">{CONTACT.phoneInternational}</span></span></a>
                <a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white"><MessageCircle size={20} /></span><span><span className="block text-xs text-stone-400">{t('common.whatsapp')}</span><span className="mt-0.5 block font-bold" dir="ltr">{CONTACT.phoneDisplay}</span></span></a>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-forest-950"><Mail size={20} /></span><span className="min-w-0"><span className="block text-xs text-stone-400">{t('common.email')}</span><span className="mt-0.5 block truncate text-sm font-bold">{CONTACT.email}</span></span></a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-gold/25 bg-gold/10 p-7"><h3 className="font-extrabold text-forest-950 dark:text-white">{t('contact.businessInfoTitle')}</h3><p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-300">{t('contact.businessInfoText')}</p></div>
          </aside>
        </div>
      </section>
    </>
  );
}
