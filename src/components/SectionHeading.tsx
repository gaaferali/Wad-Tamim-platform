type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: 'start' | 'center';
};

export function SectionHeading({ eyebrow, title, text, align = 'start' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>{eyebrow}</p>
      <h2 className="heading-section">{title}</h2>
      {text && <p className="body-large mt-5">{text}</p>}
    </div>
  );
}
