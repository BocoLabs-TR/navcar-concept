import {Clock, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {OpenWhatsAppButton} from './WhatsApp';

export const CONTACT = {phone: '+90 324 000 00 00', email: 'info@navcar.example'};

export function Contact() {
  const t = useTranslations('contact');
  const row = 'flex items-start gap-4';
  const icon = 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-orange';

  return (
    <section id="iletisim" aria-labelledby="contact-title" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow text-teal-dark">{t('eyebrow')}</p>
          <h2 id="contact-title" className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t('text')}</p>

          <ul className="mt-8 space-y-5">
            <li className={row}>
              <span className={icon}><MapPin size={20} aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{t('address.label')}</p>
                <address className="font-bold not-italic text-navy">{t('address.value')}</address>
              </div>
            </li>
            <li className={row}>
              <span className={icon}><Phone size={20} aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{t('phone.label')}</p>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="font-bold text-navy hover:underline">
                  <span dir="ltr" className="inline-block">{CONTACT.phone}</span>
                </a>
              </div>
            </li>
            <li className={row}>
              <span className={icon}><Mail size={20} aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{t('email.label')}</p>
                <a href={`mailto:${CONTACT.email}`} className="font-bold text-navy hover:underline">
                  <span dir="ltr" className="inline-block">{CONTACT.email}</span>
                </a>
              </div>
            </li>
            <li className={row}>
              <span className={icon}><Clock size={20} aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{t('hours.label')}</p>
                <p className="font-bold text-navy">
                  {t('hours.days')} <span dir="ltr" className="inline-block">{t('hours.time')}</span>
                </p>
              </div>
            </li>
            <li className={row}>
              <span className={icon}><MessageCircle size={20} aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-muted">{t('whatsapp.label')}</p>
                <OpenWhatsAppButton className="font-bold text-teal-dark underline decoration-2 underline-offset-4 hover:text-navy">
                  {t('whatsapp.action')}
                </OpenWhatsAppButton>
              </div>
            </li>
          </ul>
        </div>

        {/* stylised location card (no external map) */}
        <div
          role="img"
          aria-label={t('card.label')}
          className="relative min-h-[20rem] overflow-hidden rounded-2xl bg-navy text-white lg:min-h-0"
        >
          <svg viewBox="0 0 480 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <pattern id="loc-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="#fff" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="480" height="400" fill="url(#loc-dots)" />
            <g fill="none" stroke="#1F7A8C" strokeWidth="1.5" opacity="0.7">
              <circle cx="240" cy="190" r="50" />
              <circle cx="240" cy="190" r="100" />
              <circle cx="240" cy="190" r="150" strokeDasharray="4 8" />
            </g>
            <path d="M0 330 q40 -16 80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
            <path d="M0 356 q40 -16 80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#1F7A8C" strokeWidth="2.2" />
            {/* quay crane */}
            <g fill="#F5F3EE" opacity="0.9">
              <path d="M70 330 V250 H78 V330 Z M130 330 V250 H138 V330 Z M60 250 H160 V258 H60 Z" />
              <path d="M70 250 L160 215 L160 222 L78 256 Z" />
              <rect x="90" y="236" width="22" height="14" fill="#E8833A" />
            </g>
            <g>
              <circle cx="240" cy="190" r="22" fill="#E8833A" opacity="0.3" className="pulse-ring" />
              <path d="M240 214 c-18 -22 -26 -34 -26 -46 a26 26 0 0 1 52 0 c0 12 -8 24 -26 46 z" fill="#E8833A" />
              <circle cx="240" cy="168" r="9" fill="#0B1F3A" />
            </g>
          </svg>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-6 pt-16">
            <p className="text-xl font-extrabold">{t('card.title')}</p>
            <p className="text-sm text-white/75">{t('card.sub')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
