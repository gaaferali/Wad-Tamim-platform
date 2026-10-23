import { useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const isArabic = i18n.language === 'ar';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <>
      <a href="#main-content" className="fixed start-4 top-3 z-[100] -translate-y-24 rounded-full bg-gold px-4 py-2 text-sm font-bold text-forest-950 transition focus:translate-y-0">{t('common.skipToContent')}</a>
      <ScrollToTop />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
