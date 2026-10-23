import { BadgeDollarSign, Boxes, MessageSquareText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ButtonLink } from '../components/ButtonLink';
import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { SectionHeading } from '../components/SectionHeading';
import { Seo } from '../components/Seo';
import { products } from '../data/products';

export function ProductsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Seo titleKey="productsPage.seoTitle" descriptionKey="productsPage.seoDescription" image="/media/products/hibiscus-bulk.webp" imageAltKey="common.imageAltHibiscus" />
      <PageHero eyebrow={t('productsPage.eyebrow')} title={t('productsPage.heroTitle')} text={t('productsPage.heroText')} image="/media/products/hibiscus-bulk.webp" alt={t('common.imageAltHibiscus')} objectPosition="center 48%">
        <ButtonLink to="/contact" variant="light" arrow>{t('common.requestQuote')}</ButtonLink>
      </PageHero>

      <section className="section-space">
        <div className="container-site">
          <SectionHeading eyebrow={t('productsPage.catalogKicker')} title={t('productsPage.catalogTitle')} text={t('productsPage.catalogText')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-space bg-sage/70 dark:bg-forest-900/55">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="eyebrow">{t('home.wholesaleKicker')}</p>
            <h2 className="heading-section">{t('productsPage.wholesaleTitle')}</h2>
            <p className="body-large mt-6">{t('productsPage.wholesaleText')}</p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm font-semibold leading-6 text-amber-900 dark:text-amber-200"><BadgeDollarSign className="mt-0.5 shrink-0" size={20} />{t('productsPage.noPrices')}</div>
            <div className="mt-8"><ButtonLink to="/contact" variant="primary" arrow>{t('common.requestQuote')}</ButtonLink></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-surface p-7"><Boxes className="text-forest-700 dark:text-gold" size={30} /><h3 className="mt-5 text-xl font-extrabold text-forest-950 dark:text-white">{t('home.reasons.scale.title')}</h3><p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">{t('home.reasons.scale.text')}</p></div>
            <div className="card-surface p-7 sm:mt-8"><MessageSquareText className="text-forest-700 dark:text-gold" size={30} /><h3 className="mt-5 text-xl font-extrabold text-forest-950 dark:text-white">{t('home.reasons.care.title')}</h3><p className="mt-3 leading-7 text-stone-600 dark:text-stone-300">{t('home.reasons.care.text')}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
