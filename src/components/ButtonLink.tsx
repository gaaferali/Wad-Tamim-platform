import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

type Props = {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ to, children, variant = 'primary', className = '', arrow = false }: Props) {
  const { i18n } = useTranslation();
  const Arrow = i18n.language === 'ar' ? ArrowLeft : ArrowRight;
  const variants = {
    primary: 'bg-forest-900 text-white hover:bg-forest-700 dark:bg-gold dark:text-forest-950 dark:hover:bg-[#d8bb7a]',
    secondary: 'border border-forest-900/20 bg-transparent text-forest-950 hover:bg-forest-900 hover:text-white dark:border-white/25 dark:text-white dark:hover:bg-white dark:hover:text-forest-950',
    light: 'bg-white text-forest-950 hover:bg-cream'
  };

  return (
    <Link to={to} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}>
      {children}
      {arrow && <Arrow size={17} strokeWidth={2.25} />}
    </Link>
  );
}
