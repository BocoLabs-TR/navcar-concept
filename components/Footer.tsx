import {useTranslations} from 'next-intl';
import {Logo} from './Logo';

const LINKS = [
  {key: 'about', id: 'hakkimizda'},
  {key: 'services', id: 'hizmetler'},
  {key: 'routes', id: 'rotalar'},
  {key: 'quote', id: 'teklif-al'},
  {key: 'contact', id: 'iletisim'}
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tb = useTranslations('brand');

  return (
    <footer className="bg-[#07152a] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo tone="light" sub={tb('sub')} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{t('blurb')}</p>
        </div>
        <nav aria-label={t('links')}>
          <p className="text-sm font-bold text-white">{t('links')}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="hover:text-white hover:underline">
                  {tn(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights')}</p>
          <p>
            {t('concept')}{' '}
            <a href="https://bocolabs.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange hover:underline">
              <span dir="ltr">bocolabs.com</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
