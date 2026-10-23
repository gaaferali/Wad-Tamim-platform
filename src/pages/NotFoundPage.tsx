import { Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ButtonLink';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[760px] items-center bg-sage/60 pt-24 text-center dark:bg-forest-950">
      <Seo titleKey="notFound.seoTitle" />
      <div className="container-site">
        <Sprout className="mx-auto text-gold" size={46} strokeWidth={1.5} />
        <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.2em] text-forest-700 dark:text-gold">{t('notFound.eyebrow')}</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold text-forest-950 sm:text-6xl dark:text-white">{t('notFound.title')}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-300">{t('notFound.text')}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3"><ButtonLink to="/" variant="primary" arrow>{t('notFound.home')}</ButtonLink><ButtonLink to="/products" variant="secondary" arrow>{t('common.exploreProducts')}</ButtonLink></div>
      </div>
    </section>
  );
}
