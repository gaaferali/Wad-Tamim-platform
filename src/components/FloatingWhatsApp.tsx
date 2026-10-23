import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { buildWhatsAppUrl } from '../lib/constants';

export function FloatingWhatsApp() {
  const { t } = useTranslation();
  return (
    <a href={buildWhatsAppUrl(t('contact.whatsappMessage', { name: t('contact.notProvided'), phone: t('contact.notProvided'), product: t('contact.notProvided'), quantity: t('contact.notProvided'), type: t('contact.notProvided'), message: t('contact.notProvided') }))} target="_blank" rel="noreferrer" aria-label={t('common.whatsapp')} className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,.35)] transition hover:-translate-y-1 hover:bg-[#20bd5a] sm:bottom-7 sm:end-7">
      <MessageCircle size={26} fill="currentColor" strokeWidth={1.5} />
    </a>
  );
}
