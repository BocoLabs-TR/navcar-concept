import {useTranslations} from 'next-intl';
import {QuoteForm} from './QuoteForm';

export function QuoteSection() {
  const t = useTranslations('quote');
  return (
    <section id="teklif-al" aria-labelledby="quote-title" className="relative overflow-hidden bg-navy py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(50rem_26rem_at_10%_0%,rgba(31,122,140,0.5),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
        <div className="lg:pt-4">
          <p className="eyebrow text-orange">{t('eyebrow')}</p>
          <h2 id="quote-title" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">{t('text')}</p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
