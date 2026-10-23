import { CircleDot, Leaf, Nut, PackageOpen, Sprout, TreePine } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../data/products';

const icons = {
  'gum-arabic': TreePine,
  frankincense: Sprout,
  hibiscus: Leaf,
  tasali: Nut,
  tamarind: PackageOpen,
  sesame: CircleDot,
  gudeim: Sprout
};

export function ProductVisual({ product, className = '' }: { product: Product; className?: string }) {
  const { t } = useTranslation();
  const Icon = icons[product.slug];

  if (product.image) {
    return (
      <img
        src={product.image}
        alt={t(product.imageAltKey)}
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.035] ${className}`}
        style={{ objectPosition: product.objectPosition }}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className={`soft-grid flex h-full w-full flex-col items-center justify-center bg-gradient-to-br ${product.accent} px-6 text-center ${className}`} role="img" aria-label={t('productsPage.photoPending')}>
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-forest-900/10 bg-white/70 text-forest-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-forest-950/60 dark:text-gold">
        <Icon size={30} strokeWidth={1.6} />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-forest-800/80 dark:text-stone-300">{t('common.placeholderLabel')}</span>
    </div>
  );
}
