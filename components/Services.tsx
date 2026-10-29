import {Boxes, Compass, Container, FileCheck, Snowflake, Truck} from 'lucide-react';
import {useTranslations} from 'next-intl';

const ICONS = [Container, Boxes, Compass, FileCheck, Snowflake, Truck];

export function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as {title: string; text: string}[];

  return (
    <section id="hizmetler" aria-labelledby="services-title" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow text-teal-dark">{t('eyebrow')}</p>
        <h2 id="services-title" className="mt-3 max-w-2xl text-3xl font-extrabold text-navy sm:text-4xl">
          {t('title')}
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lg hover:shadow-navy/5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-orange transition-transform duration-300 [transform-origin:0_50%] group-hover:scale-x-100 rtl:[transform-origin:100%_50%]"
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-teal-dark transition-colors group-hover:bg-navy group-hover:text-orange">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
