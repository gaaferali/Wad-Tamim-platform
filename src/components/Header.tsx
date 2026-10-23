import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { useTheme } from './ThemeProvider';

const navItems = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/about', key: 'nav.about' },
  { to: '/products', key: 'nav.products' },
  { to: '/contact', key: 'nav.contact' }
];

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  const toggleLanguage = async () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    await i18n.changeLanguage(next);
    localStorage.setItem('wad-tamim-language', next);
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-bold transition ${isActive ? 'text-forest-800 dark:text-gold' : 'text-stone-600 hover:text-forest-800 dark:text-stone-300 dark:hover:text-white'} after:absolute after:bottom-0 after:start-0 after:h-0.5 after:rounded-full after:bg-gold after:transition-all ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-forest-950/5 bg-cream/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-forest-950/90">
      <div className="container-site flex h-[76px] items-center justify-between gap-4">
        <Link to="/" aria-label={t('brand.name')}><Logo /></Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t('footer.quickLinks')}>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>{t(item.key)}</NavLink>)}
        </nav>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={toggleLanguage} className="flex h-10 items-center gap-2 rounded-full px-3 text-xs font-extrabold text-forest-900 transition hover:bg-forest-900/5 dark:text-stone-100 dark:hover:bg-white/10" aria-label={t('nav.switchLanguage')} title={t('nav.switchLanguage')}>
            <Languages size={18} />
            <span>{i18n.language === 'ar' ? 'EN' : 'ع'}</span>
          </button>
          <button type="button" onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition hover:bg-forest-900/5 dark:text-gold dark:hover:bg-white/10" aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')} title={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}>
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <Link to="/contact" className="ms-2 hidden rounded-full bg-forest-900 px-5 py-3 text-xs font-extrabold text-white transition hover:bg-forest-700 xl:inline-flex dark:bg-gold dark:text-forest-950 dark:hover:bg-[#d8bb7a]">{t('nav.quote')}</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="ms-1 flex h-10 w-10 items-center justify-center rounded-full text-forest-950 hover:bg-forest-900/5 dark:text-white dark:hover:bg-white/10 lg:hidden" aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-forest-950/5 bg-cream transition-all duration-300 dark:border-white/10 dark:bg-forest-950 lg:hidden ${open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="container-site flex flex-col gap-1 py-5" aria-label={t('footer.quickLinks')}>
          {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-sage text-forest-900 dark:bg-white/10 dark:text-gold' : 'text-stone-600 hover:bg-white dark:text-stone-300 dark:hover:bg-white/5'}`}>{t(item.key)}</NavLink>)}
          <Link to="/contact" className="mt-3 inline-flex justify-center rounded-full bg-forest-900 px-5 py-3.5 text-sm font-extrabold text-white dark:bg-gold dark:text-forest-950">{t('nav.quote')}</Link>
        </nav>
      </div>
    </header>
  );
}
