'use client';

import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';

export function LocaleSwitcher({className = ''}: {className?: string}) {
  const locale = useLocale();
  const t = useTranslations('lang');

  return (
    <nav aria-label={t('label')} className={className}>
      <ul className="flex items-center rounded-full border border-white/25 p-0.5 text-sm font-bold" dir="ltr">
        {routing.locales.map((loc) => {
          const active = loc === locale;
          return (
            <li key={loc}>
              <a
                href={`/${loc}/`}
                hrefLang={loc}
                lang={loc}
                aria-label={t(loc)}
                aria-current={active ? 'true' : undefined}
                onClick={(e) => {
                  // keep the visitor on the same section
                  e.currentTarget.hash = window.location.hash;
                }}
                className={`block rounded-full px-2.5 py-1.5 text-[0.8rem] transition-colors sm:px-3 sm:text-sm ${
                  active ? 'bg-white text-navy' : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                {loc.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
