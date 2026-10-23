import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <span className="flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-forest-900/10 bg-[#e8f2ec] shadow-sm dark:border-white/15 dark:bg-stone-950">
        <img
          src={theme === 'light' ? '/media/branding/logo-light.webp' : '/media/branding/logo-dark-original.webp'}
          alt={t('brand.name')}
          className={`h-full w-full object-contain ${theme === 'dark' ? 'brightness-150 contrast-125' : ''}`}
          width="48"
          height="48"
        />
      </span>
      {!compact && (
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-extrabold leading-5 text-forest-950 dark:text-white">{t('brand.name')}</span>
          <span className="block truncate text-[11px] font-semibold tracking-wide text-forest-700 dark:text-gold">{t('brand.slogan')}</span>
        </span>
      )}
    </span>
  );
}
