export const productSlugs = [
  'gum-arabic',
  'frankincense',
  'hibiscus',
  'tasali',
  'tamarind',
  'sesame',
  'gudeim'
] as const;

export type ProductSlug = (typeof productSlugs)[number];

export type Product = {
  slug: ProductSlug;
  image: string;
  imageAltKey:
    | 'common.imageAltGum'
    | 'common.imageAltFrankincense'
    | 'common.imageAltHibiscus'
    | 'common.imageAltTasali'
    | 'common.imageAltTamarind'
    | 'common.imageAltSesame'
    | 'common.imageAltGudeim';
  objectPosition?: string;
  accent: string;
};

export const products: Product[] = [
  { slug: 'gum-arabic', image: '/media/products/gum-arabic.webp', imageAltKey: 'common.imageAltGum', objectPosition: 'center', accent: 'from-amber-100 to-stone-200 dark:from-amber-950/50 dark:to-stone-900' },
  { slug: 'frankincense', image: '/media/products/frankincense-luban.webp', imageAltKey: 'common.imageAltFrankincense', objectPosition: 'center 48%', accent: 'from-stone-100 to-amber-50 dark:from-stone-900 dark:to-amber-950/40' },
  { slug: 'hibiscus', image: '/media/products/hibiscus-bulk.webp', imageAltKey: 'common.imageAltHibiscus', objectPosition: 'center 48%', accent: 'from-rose-100 to-red-50 dark:from-rose-950/50 dark:to-red-950/30' },
  { slug: 'tasali', image: '/media/products/tasali-watermelon-seeds.webp', imageAltKey: 'common.imageAltTasali', objectPosition: 'center', accent: 'from-slate-100 to-stone-200 dark:from-slate-900 dark:to-stone-800' },
  { slug: 'tamarind', image: '/media/products/tamarind-aradeib.webp', imageAltKey: 'common.imageAltTamarind', objectPosition: 'center 48%', accent: 'from-orange-100 to-amber-100 dark:from-orange-950/50 dark:to-amber-950/30' },
  { slug: 'sesame', image: '/media/products/sesame.webp', imageAltKey: 'common.imageAltSesame', objectPosition: 'center 42%', accent: 'from-yellow-50 to-stone-100 dark:from-yellow-950/40 dark:to-stone-900' },
  { slug: 'gudeim', image: '/media/products/gudeim-grewia.webp', imageAltKey: 'common.imageAltGudeim', objectPosition: 'center 48%', accent: 'from-orange-100 to-rose-100 dark:from-orange-950/50 dark:to-rose-950/40' }
];

export const isProductSlug = (value: string | null): value is ProductSlug =>
  value !== null && productSlugs.includes(value as ProductSlug);
