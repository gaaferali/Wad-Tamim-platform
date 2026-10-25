import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonLink } from '../components/ButtonLink';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { isProductSlug, products } from '../data/products';
import { buildWhatsAppUrl, CONTACT } from '../lib/constants';
import type { InquiryFormValues } from '../types/inquiry';

export function ContactPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const queryProduct = searchParams.get('product');
  const initialProduct = isProductSlug(queryProduct) ? queryProduct : '';

  const schema = useMemo(() => z.object({
    fullName: z.string().trim().min(2, t('contact.validations.nameRequired')).max(120, t('contact.validations.nameLong')),
    phone: z.string().trim().min(7, t('contact.validations.phoneRequired')).max(30, t('contact.validations.phoneRequired')).regex(/^[+\d\s().-]+$/, t('contact.validations.phoneRequired')),
    email: z.union([z.literal(''), z.string().trim().email(t('contact.validations.emailInvalid'))]).optional(),
    product: z.enum(['gum-arabic', 'frankincense', 'hibiscus', 'tasali', 'tamarind', 'sesame', 'gudeim'], { error: t('contact.validations.productRequired') }).or(z.literal('').refine(() => false, t('contact.validations.productRequired'))),
    quantity: z.string().trim().max(100, t('contact.validations.quantityLong')).optional(),
    inquiryType: z.enum(['domestic', 'export'], { error: t('contact.validations.typeRequired') }),
    message: z.string().trim().min(10, t('contact.validations.messageRequired')).max(2000, t('contact.validations.messageLong'))
  }), [t]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<InquiryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', phone: '', email: '', product: initialProduct, quantity: '', inquiryType: 'domestic', message: '' }
  });

  const buildInquiryMessage = (data: InquiryFormValues) => t('contact.whatsappMessage', {
    name: data.fullName || t('contact.notProvided'),
    phone: data.phone || t('contact.notProvided'),
    email: data.email || t('contact.notProvided'),
    product: data.product ? t(`products.${data.product}.name`) : t('contact.notProvided'),
    quantity: data.quantity || t('contact.notProvided'),
    type: t(data.inquiryType === 'export' ? 'contact.export' : 'contact.domestic'),
    message: data.message || t('contact.notProvided')
  });

  const values = watch();
  const whatsappMessage = buildInquiryMessage(values);

  const onSubmit = (data: InquiryFormValues) => {
    window.location.assign(buildWhatsAppUrl(buildInquiryMessage(data)));
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

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
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
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(37,211,102,.24)] transition hover:-translate-y-0.5 hover:bg-[#1fbd59] hover:shadow-[0_14px_34px_rgba(37,211,102,.34)]"><WhatsAppIcon size={21} />{t('contact.submitWhatsApp')}</button>
              <p className="flex items-start gap-2 text-xs leading-5 text-stone-500 dark:text-stone-400"><ShieldCheck className="mt-0.5 shrink-0" size={15} />{t('contact.privacy')}</p>
            </form>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[2rem] bg-forest-950 p-8 text-white shadow-soft sm:p-9">
              <p className="eyebrow !text-gold">{t('contact.directKicker')}</p><h2 className="text-3xl font-extrabold">{t('contact.directTitle')}</h2><p className="mt-4 leading-7 text-stone-300">{t('contact.directText')}</p>
              <div className="mt-8 space-y-3">
                <a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold text-forest-950"><Phone size={20} /></span><span><span className="block text-xs text-stone-400">{t('common.phone')}</span><span className="mt-0.5 block font-bold" dir="ltr">{CONTACT.phoneInternational}</span></span></a>
                <a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366] text-white"><WhatsAppIcon size={21} /></span><span><span className="block text-xs text-stone-400">{t('common.whatsapp')}</span><span className="mt-0.5 block font-bold" dir="ltr">{CONTACT.phoneDisplay}</span></span></a>
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
