import {BadgeCheck, Clock, Eye} from 'lucide-react';
import {useTranslations} from 'next-intl';

const ICONS = [Clock, BadgeCheck, Eye];

export function About() {
  const t = useTranslations('about');
  const values = t.raw('values') as {title: string; text: string}[];

  return (
    <section id="hakkimizda" aria-labelledby="about-title" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-teal-dark">{t('eyebrow')}</p>
            <h2 id="about-title" className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              {t('title')}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted sm:text-lg">{t('text')}</p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <li key={v.title} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_0_rgba(11,31,58,0.04)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-orange">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
