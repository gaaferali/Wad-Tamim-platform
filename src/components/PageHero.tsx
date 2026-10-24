import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  children?: ReactNode;
  objectPosition?: string;
  backgroundImage?: boolean;
};

export function PageHero({ eyebrow, title, text, image, alt, children, objectPosition = 'center', backgroundImage = false }: Props) {
  const content = (
    <div className="reveal w-full max-w-3xl py-4 lg:py-12">
      <p className="eyebrow !text-gold">{eyebrow}</p>
      <h1 className="heading-display max-w-3xl text-balance">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">{text}</p>
      {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
    </div>
  );

  if (backgroundImage) {
    return (
      <section className="relative isolate overflow-hidden bg-forest-950 text-white">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          style={{ objectPosition }}
          decoding="async"
          loading="eager"
        />
        <div className="absolute inset-0 -z-20 bg-forest-950/65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/85 via-forest-950/55 to-forest-900/25 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 -z-10 opacity-[.1] soft-grid" />
        <div className="container-site flex min-h-[680px] items-center pb-16 pt-28 sm:min-h-[720px] lg:pb-20 lg:pt-32">
          <div className="me-auto w-full">{content}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <div className="absolute inset-0 -z-20 opacity-[.12] soft-grid" />
      <div className="absolute -end-32 top-20 -z-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -start-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-forest-600/30 blur-3xl" />
      <div className="container-site relative grid min-h-[680px] items-center gap-10 pb-16 pt-28 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.72fr)] lg:gap-16 lg:pb-20 lg:pt-32">
        {content}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="absolute -inset-4 rounded-[2.75rem] border border-white/10 bg-white/5" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-forest-900 shadow-soft">
            <img
              src={image}
              alt={alt}
              className="aspect-[3/4] w-full object-cover"
              style={{ objectPosition }}
              decoding="async"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
