import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { CONTACT } from '../lib/constants';
import { Logo } from './Logo';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-forest-950 text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.8fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 leading-7 text-stone-300">{t('footer.description')}</p>
          <p className="mt-5 border-s-2 border-gold ps-4 text-sm leading-6 text-stone-400">{t('footer.note')}</p>
        </div>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold">{t('footer.quickLinks')}</h2>
          <ul className="mt-5 space-y-3 text-sm text-stone-300">
            <li><Link className="transition hover:text-white" to="/">{t('nav.home')}</Link></li>
            <li><Link className="transition hover:text-white" to="/about">{t('nav.about')}</Link></li>
            <li><Link className="transition hover:text-white" to="/products">{t('nav.products')}</Link></li>
            <li><Link className="transition hover:text-white" to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold">{t('footer.products')}</h2>
          <ul className="mt-5 space-y-3 text-sm text-stone-300">
            {products.slice(0, 5).map((product) => <li key={product.slug}><Link className="transition hover:text-white" to={`/contact?product=${product.slug}`}>{t(`products.${product.slug}.arName`)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-gold">{t('footer.contact')}</h2>
          <ul className="mt-5 space-y-4 text-sm text-stone-300">
            <li><a className="flex items-start gap-3 transition hover:text-white" href={CONTACT.phoneHref}><Phone className="mt-0.5 shrink-0 text-gold" size={17} /><span dir="ltr">{CONTACT.phoneInternational}</span></a></li>
            <li><a className="flex items-start gap-3 break-all transition hover:text-white" href={`mailto:${CONTACT.email}`}><Mail className="mt-0.5 shrink-0 text-gold" size={17} /><span>{CONTACT.email}</span></a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-gold" size={17} /><span>{t('brand.location')}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-center text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:text-start">
          <p>© {new Date().getFullYear()} {t('brand.name')}. {t('footer.rights')}</p>
          <p>{t('brand.slogan')}</p>
        </div>
      </div>
    </footer>
  );
}
