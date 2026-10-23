import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  titleKey: string;
  descriptionKey?: string;
  image?: string;
  imageAltKey?: string;
};

export function Seo({ titleKey, descriptionKey, image = '/media/operations/warehouse-sacks-01.webp', imageAltKey = 'common.imageAltOperations' }: Props) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t(titleKey);
    const description = descriptionKey ? t(descriptionKey) : '';
    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      const node = document.querySelector<HTMLMetaElement>(selector);
      if (node) node.setAttribute(attribute, value);
    };

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:image:alt"]', 'content', t(imageAltKey));
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:image"]', 'content', image);
    if (description) setMeta('meta[name="twitter:description"]', 'content', description);
  }, [descriptionKey, i18n.language, image, imageAltKey, t, titleKey]);

  return null;
}
