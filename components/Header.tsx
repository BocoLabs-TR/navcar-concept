'use client';

import {Menu, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {LocaleSwitcher} from './LocaleSwitcher';
import {Logo} from './Logo';

const LINKS = [
  {key: 'about', id: 'hakkimizda'},
  {key: 'services', id: 'hizmetler'},
  {key: 'routes', id: 'rotalar'},
  {key: 'contact', id: 'iletisim'}
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tb = useTranslations('brand');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5 md:h-[4.5rem]">
        <a href="#top" aria-label={t('home')} className="rounded-md">
          <Logo tone="light" sub={tb('sub')} />
        </a>

        <nav aria-label={t('main')} className="hidden md:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-semibold">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="rounded-md px-3 py-2 text-white/85 transition-colors hover:text-white">
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <a
            href="#teklif-al"
            className="hidden rounded-lg bg-orange px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-[#f09a5c] lg:inline-block"
          >
            {t('quote')}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/25 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 bg-navy md:hidden">
        <nav aria-label={t('main')} className="mx-auto max-w-6xl px-5 py-4">
          <ul className="flex flex-col gap-1 text-base font-semibold">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-white/90 hover:bg-white/10"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#teklif-al"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-orange px-4 py-3 text-center font-bold text-navy"
              >
                {t('quote')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
