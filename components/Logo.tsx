type Props = {tone?: 'dark' | 'light'; sub?: string; className?: string};

/** Wordmark: wave/route-line mark + NAVCAR. Always LTR (brand mark). */
export function Logo({tone = 'dark', sub, className = ''}: Props) {
  const word = tone === 'dark' ? 'text-navy' : 'text-white';
  const subTone = tone === 'dark' ? 'text-teal-dark' : 'text-white/70';
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="h-[34px] w-[34px] shrink-0 sm:h-[38px] sm:w-[38px]">
        <rect width="40" height="40" rx="10" fill={tone === 'dark' ? '#0B1F3A' : '#14325C'} />
        <path d="M6 24c3.5-4 7-4 10.5 0s7 4 10.5 0 5-3 7-2" fill="none" stroke="#F5F3EE" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M6 30c3.5-4 7-4 10.5 0s7 4 10.5 0 5-3 7-2" fill="none" stroke="#1F7A8C" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M9 15 Q20 4 31 11" fill="none" stroke="#E8833A" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 4.2" />
        <circle cx="31" cy="11" r="3" fill="#E8833A" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[1.1rem] font-extrabold tracking-[0.08em] sm:text-[1.3rem] sm:tracking-[0.12em] ${word}`}>NAVCAR</span>
        {sub ? (
          <span
            className={`mt-1 font-semibold ${subTone} ${
              /^[ -ɏ]+$/.test(sub) ? 'text-[0.62rem] uppercase tracking-[0.3em]' : 'text-[0.72rem]'
            }`}
          >
            {sub}
          </span>
        ) : null}
      </span>
    </span>
  );
}
