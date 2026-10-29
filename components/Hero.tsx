import {ArrowRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {HeroArt} from './HeroArt';

export function Hero() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as {value: string; label: string}[];

  return (
    <section className="relative overflow-hidden bg-navy text-white" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60rem_30rem_at_85%_-10%,rgba(31,122,140,0.55),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-16 lg:pt-20">
        <div>
          <p className="eyebrow anim-fade-up text-orange">{t('eyebrow')}</p>
          <h1
            id="hero-title"
            className="anim-fade-up anim-delay-1 mt-4 text-[2.1rem] font-extrabold leading-[1.12] sm:text-5xl lg:text-[3.4rem]"
          >
            {t('title')}
          </h1>
          <p className="anim-fade-up anim-delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {t('text')}
          </p>
          <div className="anim-fade-up anim-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#teklif-al"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-6 py-3.5 text-base font-bold text-navy transition-colors hover:bg-[#f09a5c]"
            >
              {t('ctaQuote')}
              <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
            </a>
            <a
              href="#rotalar"
              className="inline-flex items-center justify-center rounded-lg border border-white/35 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              {t('ctaRoutes')}
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none rtl:-scale-x-100">
          <HeroArt label={t('artLabel')} />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 gap-3 px-5 py-6 sm:gap-8 sm:py-8">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <dd className="text-2xl font-extrabold text-white sm:text-4xl">
                <span dir="ltr" className="inline-block">{s.value}</span>
              </dd>
              <dt className="mt-1 text-xs font-semibold text-white/70 sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
