'use client';

import {ArrowRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {NODES, ROUTES, routePath} from '@/lib/data';

type Item = {from: string; to: string; range: string; unit: string; frequency: string};

const BENDS = [0.22, 0.2, 0.2, 0.28, 0.22, 0.2];

export function Routes() {
  const t = useTranslations('routes');
  const tp = useTranslations('ports');
  const items = t.raw('items') as Item[];
  const [active, setActive] = useState<number | null>(null);

  const activeNodes = active === null ? null : new Set<string>([ROUTES[active].from, ROUTES[active].to]);

  return (
    <section id="rotalar" aria-labelledby="routes-title" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow text-teal-dark">{t('eyebrow')}</p>
        <h2 id="routes-title" className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
          {t('title')}
        </h2>

        {/* abstract route diagram — not a geographic map */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-navy p-2 sm:p-4" dir="ltr">
          <svg viewBox="0 0 800 380" role="img" aria-label={t('mapLabel')} className="h-auto w-full">
            <defs>
              <pattern id="map-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.3" fill="#fff" opacity="0.14" />
              </pattern>
            </defs>
            <rect width="800" height="380" fill="url(#map-dots)" />
            <ellipse cx="300" cy="140" rx="170" ry="90" fill="#1F7A8C" opacity="0.12" />
            <ellipse cx="610" cy="220" rx="150" ry="100" fill="#E8833A" opacity="0.06" />

            {ROUTES.map((r, i) => {
              const d = routePath(r.from, r.to, BENDS[i]);
              const on = active === i;
              const dim = active !== null && !on;
              return (
                <g key={i} opacity={dim ? 0.18 : 1} style={{transition: 'opacity .25s'}}>
                  <path
                    d={d}
                    fill="none"
                    stroke={on ? '#E8833A' : '#7FC3D1'}
                    strokeWidth={on ? 3 : 1.8}
                    strokeLinecap="round"
                    className="route-flow"
                  />
                  <circle r="4.5" fill="#E8833A" className="route-dot" style={{offsetPath: `path('${d}')`, animationDelay: `${-i * 1.4}s`}} />
                </g>
              );
            })}

            {Object.entries(NODES).map(([id, p]) => {
              const dim = activeNodes && !activeNodes.has(id);
              const isOrigin = ['ambarli', 'gemlik', 'izmir', 'mersin'].includes(id);
              const flip = id === 'ambarli' || id === 'gemlik' || id === 'izmir' || id === 'hamburg';
              return (
                <g key={id} opacity={dim ? 0.25 : 1} style={{transition: 'opacity .25s'}}>
                  <circle cx={p.x} cy={p.y} r={isOrigin ? 7 : 6} fill={isOrigin ? '#E8833A' : '#F5F3EE'} stroke="#0B1F3A" strokeWidth="2" />
                  <text
                    x={p.x}
                    y={p.y + (flip ? -14 : 24)}
                    textAnchor="middle"
                    fontSize="17"
                    fontWeight="700"
                    fill="#F5F3EE"
                    stroke="#0B1F3A"
                    strokeWidth="4"
                    paintOrder="stroke"
                  >
                    {tp(id)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <li
              key={i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((a) => (a === i ? null : i))}
              className={`rounded-2xl border bg-white p-5 transition-all ${
                active === i ? 'border-orange shadow-lg shadow-navy/10 ring-1 ring-orange' : 'border-navy/10'
              }`}
            >
              <div className="flex items-center gap-2 text-lg font-extrabold text-navy">
                <span>{r.from}</span>
                <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-orange-dark rtl:rotate-180" />
                <span>{r.to}</span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-navy/10 pt-4 text-sm">
                <div>
                  <dt className="text-muted">{t('transit')}</dt>
                  <dd className="mt-0.5 font-bold text-navy">
                    <span dir="ltr">{r.range}</span> {r.unit}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">{t('frequency')}</dt>
                  <dd className="mt-0.5 font-bold text-navy">{r.frequency}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted">{t('note')}</p>
      </div>
    </section>
  );
}
