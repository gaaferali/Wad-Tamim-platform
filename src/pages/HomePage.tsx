import { ArrowUpRight, Boxes, Globe2, Handshake, MapPinned, MessageCircleMore, PackageCheck, Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ButtonLink';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { products } from '../data/products';

export function HomePage() {
  const { t } = useTranslation();
  const reasons = [
    { key: 'source', icon: Sprout },
    { key: 'scale', icon: Boxes },
    { key: 'care', icon: Handshake },
    { key: 'flexible', icon: Globe2 }
  ];

  return (
    <>
      <Seo titleKey="home.seoTitle" descriptionKey="home.seoDescription" image="/media/operations/warehouse-sacks-01.webp" />
      <PageHero eyebrow={t('home.eyebrow')} title={t('home.heroTitle')} text={t('home.heroText')} image="/media/operations/warehouse-sacks-01.webp" alt={t('common.imageAltOperations')} objectPosition="center 48%">
        <ButtonLink to="/products" variant="light" arrow>{t('common.exploreProducts')}</ButtonLink>
        <ButtonLink to="/contact" variant="secondary" className="!border-white/45 !text-white hover:!bg-white hover:!text-forest-950" arrow>{t('common.requestQuote')}</ButtonLink>
        <span className="w-full pt-3 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{t('home.heroNote')}</span>
      </PageHero>

      <section className="section-space overflow-hidden">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="absolute -start-6 -top-6 h-36 w-36 rounded-full bg-gold/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.25rem] shadow-soft">
              <img src="/media/products/hibiscus-bulk.webp" alt={t('common.imageAltHibiscus')} className="h-[500px] w-full object-cover" style={{ objectPosition: 'center 48%' }} loading="lazy" decoding="async" />
              <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/25 bg-forest-950/75 p-6 text-white backdrop-blur-md">
                <p className="text-lg font-bold leading-8">“{t('home.introQuote')}”</p>
              </div>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow={t('home.introKicker')} title={t('home.introTitle')} text={t('home.introText')} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-sage p-6 dark:bg-forest-900">
                <PackageCheck className="text-forest-700 dark:text-gold" size={28} />
                <h3 className="mt-4 font-extrabold text-forest-950 dark:text-white">{t('home.reasons.scale.title')}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{t('home.reasons.scale.text')}</p>
              </div>
              <div className="rounded-3xl border border-forest-900/10 bg-white p-6 dark:border-white/10 dark:bg-forest-900">
                <MessageCircleMore className="text-forest-700 dark:text-gold" size={28} />
                <h3 className="mt-4 font-extrabold text-forest-950 dark:text-white">{t('home.reasons.care.title')}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{t('home.reasons.care.text')}</p>
              </div>
            </div>
            <div className="mt-8"><ButtonLink to="/about" variant="secondary" arrow>{t('common.readMore')}</ButtonLink></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-sage/65 dark:bg-forest-900/55">
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={t('home.productsKicker')} title={t('home.productsTitle')} text={t('home.productsText')} />
            <ButtonLink to="/products" variant="secondary" arrow>{t('common.viewAll')}</ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <SectionHeading eyebrow={t('home.whyKicker')} title={t('home.whyTitle')} align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ key, icon: Icon }, index) => (
              <article key={key} className="group rounded-[1.75rem] border border-forest-900/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-forest-900">
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage text-forest-800 transition group-hover:bg-forest-900 group-hover:text-white dark:bg-white/10 dark:text-gold"><Icon size={27} strokeWidth={1.7} /></span>
                  <span className="text-xs font-extrabold text-gold">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl font-extrabold text-forest-950 dark:text-white">{t(`home.reasons.${key}.title`)}</h3>
                <p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">{t(`home.reasons.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0 opacity-[.08] soft-grid" />
        <div className="container-site relative grid items-stretch lg:grid-cols-2">
          <div className="section-space pe-0 lg:pe-16">
            <p className="eyebrow !text-gold">{t('home.wholesaleKicker')}</p>
            <h2 className="heading-section !text-white">{t('home.wholesaleTitle')}</h2>
            <p className="mt-6 text-lg leading-8 text-stone-300">{t('home.wholesaleText')}</p>
            <div className="mt-10 space-y-7">
              {(['product', 'details', 'discuss'] as const).map((step) => (
                <div key={step} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-xs font-extrabold text-gold">{t(`home.flow.${step}.number`)}</span>
                  <div><h3 className="font-extrabold">{t(`home.flow.${step}.title`)}</h3><p className="mt-1 text-sm leading-6 text-stone-400">{t(`home.flow.${step}.text`)}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-10"><ButtonLink to="/contact" variant="light" arrow>{t('common.requestQuote')}</ButtonLink></div>
          </div>
          <div className="relative min-h-[520px] bg-forest-900 lg:min-h-full">
            <img src="/media/operations/warehouse-sacks-02.webp" alt={t('common.imageAltOperations')} className="absolute inset-0 h-full w-full object-contain p-5 sm:p-8" style={{ objectPosition: 'center 50%' }} loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent lg:bg-gradient-to-r lg:from-forest-950/60 lg:to-transparent rtl:lg:bg-gradient-to-l" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <SectionHeading eyebrow={t('home.marketsKicker')} title={t('home.marketsTitle')} align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-[2rem] border border-forest-900/10 bg-white p-8 sm:p-10 dark:border-white/10 dark:bg-forest-900">
              <MapPinned className="text-forest-700 dark:text-gold" size={34} strokeWidth={1.6} />
              <h3 className="mt-6 text-2xl font-extrabold text-forest-950 dark:text-white">{t('home.domesticTitle')}</h3>
              <p className="mt-3 max-w-lg leading-7 text-stone-600 dark:text-stone-300">{t('home.domesticText')}</p>
              <ArrowUpRight className="absolute end-8 top-8 text-gold transition group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </article>
            <article className="group relative overflow-hidden rounded-[2rem] bg-forest-900 p-8 text-white sm:p-10 dark:bg-gold dark:text-forest-950">
              <Globe2 className="text-gold dark:text-forest-900" size={34} strokeWidth={1.6} />
              <h3 className="mt-6 text-2xl font-extrabold">{t('home.exportTitle')}</h3>
              <p className="mt-3 max-w-lg leading-7 text-stone-300 dark:text-forest-900/75">{t('home.exportText')}</p>
              <ArrowUpRight className="absolute end-8 top-8 text-gold transition group-hover:-translate-y-1 group-hover:translate-x-1 dark:text-forest-900 rtl:group-hover:-translate-x-1" />
            </article>
          </div>
        </div>
      </section>

      <section className="section-space bg-white dark:bg-forest-900/40">
        <div className="container-site">
          <SectionHeading eyebrow={t('home.galleryKicker')} title={t('home.galleryTitle')} text={t('home.galleryText')} />
          <div className="mt-12 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <img src="/media/operations/sudan-crop-market.webp" alt={t('common.imageAltMarket')} className="h-full w-full rounded-[1.75rem] object-cover sm:row-span-2" style={{ objectPosition: 'center 45%' }} loading="lazy" decoding="async" />
            <img src="/media/products/hibiscus-hand.webp" alt={t('common.imageAltHibiscus')} className="h-full w-full rounded-[1.75rem] object-cover lg:col-span-2" style={{ objectPosition: 'center 42%' }} loading="lazy" decoding="async" />
            <img src="/media/operations/warehouse-sacks-02.webp" alt={t('common.imageAltOperations')} className="h-full w-full rounded-[1.75rem] object-cover sm:row-span-2" style={{ objectPosition: 'center 50%' }} loading="lazy" decoding="async" />
            <img src="/media/products/gum-arabic.webp" alt={t('common.imageAltGum')} className="h-full w-full rounded-[1.75rem] object-cover" loading="lazy" decoding="async" />
            <img src="/media/operations/warehouse-sacks-03.webp" alt={t('common.imageAltHibiscus')} className="h-full w-full rounded-[1.75rem] object-cover" style={{ objectPosition: 'center 48%' }} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-14 text-center text-white shadow-soft sm:px-12 sm:py-16">
            <div className="absolute -end-24 -top-24 h-64 w-64 rounded-full border-[45px] border-gold/10" />
            <div className="relative mx-auto max-w-3xl">
              <Sprout className="mx-auto text-gold" size={34} />
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{t('home.ctaTitle')}</h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-300">{t('home.ctaText')}</p>
              <div className="mt-8"><ButtonLink to="/contact" variant="light" arrow>{t('common.requestQuote')}</ButtonLink></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
