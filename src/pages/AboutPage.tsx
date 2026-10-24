import { CheckCircle2, Eye, PackageSearch, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ButtonLink';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';

export function AboutPage() {
  const { t } = useTranslation();
  const commitments = [
    { key: 'honest', icon: ShieldCheck },
    { key: 'responsive', icon: CheckCircle2 },
    { key: 'authentic', icon: Sparkles }
  ];

  return (
    <>
      <Seo titleKey="about.seoTitle" descriptionKey="about.seoDescription" image="/media/operations/warehouse-sacks-02.webp" />
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.heroTitle')} text={t('about.heroText')} image="/media/heroes/sacks.jpg" alt={t('common.imageAltOperations')} objectPosition="center 48%" backgroundImage />

      <section className="section-space">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow={t('about.storyKicker')} title={t('about.storyTitle')} />
            <p className="body-large mt-6">{t('about.storyText1')}</p>
            <p className="body-large mt-4">{t('about.storyText2')}</p>
            <div className="mt-9"><ButtonLink to="/products" variant="primary" arrow>{t('common.exploreProducts')}</ButtonLink></div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -bottom-6 -start-6 h-48 w-48 rounded-[2rem] bg-gold/20" />
            <img src="/media/operations/sudan-crop-market.webp" alt={t('common.imageAltMarket')} className="relative h-[520px] w-full rounded-[2.25rem] object-cover shadow-soft" style={{ objectPosition: 'center 45%' }} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section className="section-space bg-sage/70 dark:bg-forest-900/55">
        <div className="container-site grid gap-6 md:grid-cols-3">
          <article className="card-surface p-8"><Target className="text-forest-700 dark:text-gold" size={32} /><h2 className="mt-6 text-2xl font-extrabold text-forest-950 dark:text-white">{t('about.missionTitle')}</h2><p className="mt-4 leading-7 text-stone-600 dark:text-stone-300">{t('about.missionText')}</p></article>
          <article className="rounded-[1.75rem] bg-forest-900 p-8 text-white shadow-card dark:bg-gold dark:text-forest-950"><Eye className="text-gold dark:text-forest-900" size={32} /><h2 className="mt-6 text-2xl font-extrabold">{t('about.visionTitle')}</h2><p className="mt-4 leading-7 text-stone-300 dark:text-forest-900/75">{t('about.visionText')}</p></article>
          <article className="card-surface p-8"><PackageSearch className="text-forest-700 dark:text-gold" size={32} /><h2 className="mt-6 text-2xl font-extrabold text-forest-950 dark:text-white">{t('about.productsTitle')}</h2><p className="mt-4 leading-7 text-stone-600 dark:text-stone-300">{t('about.productsText')}</p></article>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <SectionHeading eyebrow={t('about.commitmentKicker')} title={t('about.commitmentTitle')} align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {commitments.map(({ key, icon: Icon }) => (
              <article key={key} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage text-forest-800 dark:bg-white/10 dark:text-gold"><Icon size={28} strokeWidth={1.7} /></span>
                <h3 className="mt-6 text-xl font-extrabold text-forest-950 dark:text-white">{t(`about.commitments.${key}.title`)}</h3>
                <p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">{t(`about.commitments.${key}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="container-site">
          <div className="grid overflow-hidden rounded-[2.25rem] bg-forest-950 text-white lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex min-h-[30rem] items-center justify-center bg-forest-900 p-5 sm:p-8">
              <img src="/media/operations/warehouse-sacks-01.webp" alt={t('common.imageAltOperations')} className="max-h-[42rem] w-full object-contain" loading="lazy" decoding="async" />
            </div>
            <div className="p-8 sm:p-12 lg:p-16"><p className="eyebrow !text-gold">{t('home.marketsKicker')}</p><h2 className="text-3xl font-extrabold sm:text-4xl">{t('about.supplyTitle')}</h2><p className="mt-5 max-w-2xl leading-8 text-stone-300">{t('about.supplyText')}</p><div className="mt-8"><ButtonLink to="/contact" variant="light" arrow>{t('common.contactUs')}</ButtonLink></div></div>
          </div>
        </div>
      </section>

      <section className="bg-gold/15 py-16 dark:bg-gold/10">
        <div className="container-site flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div><h2 className="text-3xl font-extrabold text-forest-950 dark:text-white">{t('about.ctaTitle')}</h2><p className="mt-2 text-stone-600 dark:text-stone-300">{t('about.ctaText')}</p></div>
          <ButtonLink to="/contact" variant="primary" arrow>{t('common.requestQuote')}</ButtonLink>
        </div>
      </section>
    </>
  );
}
