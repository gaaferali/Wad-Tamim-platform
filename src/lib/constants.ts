export const CONTACT = {
  phoneDisplay: '0999009080',
  phoneInternational: '+249999009080',
  phoneHref: 'tel:+249999009080',
  whatsappNumber: '249999009080',
  email: 'alsadqmustafa88@gmail.com'
} as const;

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
