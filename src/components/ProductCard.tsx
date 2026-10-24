import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Product } from '../data/products';
import { ProductVisual } from './ProductVisual';

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { t, i18n } = useTranslation();
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <article className={`group card-surface overflow-hidden ${featured ? 'lg:first:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/11]' : 'aspect-[4/5]'}`}>
        <ProductVisual product={product} />
        {product.image && <span className="absolute bottom-4 start-4 rounded-full bg-forest-950/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">{t('common.verifiedPhoto')}</span>}
      </div>
      <div className="p-6 sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-forest-600 dark:text-gold">{t(`products.${product.slug}.enName`)}</p>
        <h3 className="mt-2 text-2xl font-extrabold text-forest-950 dark:text-white">{t(`products.${product.slug}.arName`)}</h3>
        <p className="mt-4 line-clamp-3 leading-7 text-stone-600 dark:text-stone-300">{t(`products.${product.slug}.description`)}</p>
        {!product.image && <p className="mt-3 text-xs leading-5 text-stone-500 dark:text-stone-400">{t('common.placeholderHelp')}</p>}
        <Link to={`/contact?product=${product.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-forest-800 transition hover:text-forest-600 dark:text-gold dark:hover:text-white">
          {t('common.inquire')} <Arrow size={17} />
        </Link>
      </div>
    </article>
  );
}
