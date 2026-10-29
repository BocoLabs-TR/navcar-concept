import {useTranslations} from 'next-intl';

export function ConceptBadge() {
  const t = useTranslations('badge');
  return (
    <div className="bg-[#07152a] text-center">
      <a
        href="https://bocolabs.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80 hover:text-white"
      >
        <span className="me-2 inline-block h-1.5 w-1.5 rounded-full bg-orange align-middle" aria-hidden="true" />
        {t('text')}
      </a>
    </div>
  );
}
