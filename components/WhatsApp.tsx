'use client';

import {MessageCircle, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

const EVENT = 'navcar:whatsapp';

/** Text button (used in the contact section) that opens the floating info bubble. */
export function OpenWhatsAppButton({children, className = ''}: {children: React.ReactNode; className?: string}) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENT))}>
      {children}
    </button>
  );
}

export function WhatsApp() {
  const t = useTranslations('whatsapp');
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener(EVENT, show);
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener(EVENT, show);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <div ref={box} className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3">
      {open ? (
        <div role="status" className="anim-fade-up relative w-[min(18rem,calc(100vw-2.5rem))] rounded-2xl bg-white p-4 pe-10 text-sm leading-relaxed text-ink shadow-2xl ring-1 ring-navy/10">
          {t('bubble')}
          <button
            type="button"
            aria-label={t('close')}
            onClick={() => setOpen(false)}
            className="absolute end-1.5 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-sand"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ) : null}
      <button
        type="button"
        aria-label={t('label')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-xl transition-transform hover:scale-105"
      >
        <MessageCircle size={28} aria-hidden="true" />
      </button>
    </div>
  );
}
