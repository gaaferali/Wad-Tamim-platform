import type { ProductSlug } from '../data/products';

export type InquiryType = 'domestic' | 'export';

export type InquiryFormValues = {
  fullName: string;
  phone: string;
  email?: string;
  product: ProductSlug | '';
  quantity?: string;
  inquiryType: InquiryType;
  message: string;
  website?: string;
};

export type InquiryResponse = {
  ok: boolean;
  inquiryId?: string;
  emailStatus?: 'sent' | 'failed' | 'pending' | 'sending';
  message?: string;
};
