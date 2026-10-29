'use client';

import {CircleCheck, LoaderCircle, Minus, Plus} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useRef, useState} from 'react';
import {CONTAINER_TYPES, PORTS} from '@/lib/data';
import {PortCombobox, type PortOption} from './PortCombobox';

type Values = {
  pol: string;
  pod: string;
  type: string;
  qty: number;
  cargo: string;
  date: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  note: string;
  kvkk: boolean;
};

const EMPTY: Values = {
  pol: '',
  pod: '',
  type: 'dc20',
  qty: 1,
  cargo: '',
  date: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  note: '',
  kvkk: false
};

const FIELD_ORDER = ['pol', 'pod', 'qty', 'cargo', 'date', 'name', 'company', 'email', 'phone', 'kvkk'] as const;
type Errors = Partial<Record<(typeof FIELD_ORDER)[number], string>>;

const inputClass =
  'h-12 w-full rounded-lg border border-slate-400 bg-white px-4 text-base text-ink placeholder:text-slate-500 focus:border-teal focus:outline-none focus-visible:ring-4 focus-visible:ring-teal/25 aria-[invalid=true]:border-red-700';

function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function QuoteForm() {
  const t = useTranslations('quote');
  const tp = useTranslations('ports');
  const tc = useTranslations('countries');

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<'form' | 'sending' | 'done'>('form');
  const [ref, setRef] = useState('');
  const [formKey, setFormKey] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (phase === 'done') successRef.current?.focus();
  }, [phase]);

  const options: PortOption[] = useMemo(
    () => PORTS.map((p) => ({id: p.id, name: tp(p.id), country: tc(p.country)})),
    [tp, tc]
  );

  const set = <K extends keyof Values>(key: K, v: Values[K]) => {
    setValues((s) => ({...s, [key]: v}));
    if (key in errors) setErrors((e) => ({...e, [key]: undefined}));
  };

  const validate = (v: Values): Errors => {
    const e: Errors = {};
    if (!v.pol) e.pol = t('errors.port');
    if (!v.pod) e.pod = t('errors.port');
    else if (v.pol && v.pod === v.pol) e.pod = t('errors.samePort');
    if (!Number.isInteger(v.qty) || v.qty < 1) e.qty = t('errors.qty');
    if (!v.cargo.trim()) e.cargo = t('errors.required');
    if (!v.date) e.date = t('errors.required');
    else if (v.date < todayISO()) e.date = t('errors.date');
    if (!v.name.trim()) e.name = t('errors.required');
    if (!v.company.trim()) e.company = t('errors.required');
    if (!v.email.trim()) e.email = t('errors.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = t('errors.email');
    const digits = v.phone.replace(/\D/g, '');
    if (!v.phone.trim()) e.phone = t('errors.required');
    else if (!/^[+\d\s().-]+$/.test(v.phone) || digits.length < 7 || digits.length > 15) e.phone = t('errors.phone');
    if (!v.kvkk) e.kvkk = t('errors.kvkk');
    return e;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (phase !== 'form') return;
    const e = validate(values);
    setErrors(e);
    const first = FIELD_ORDER.find((k) => e[k]);
    if (first) {
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    setPhase('sending');
    timer.current = setTimeout(() => {
      setRef(`NC-${Math.floor(10000 + Math.random() * 90000)}`);
      setPhase('done');
    }, 600);
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setRef('');
    setFormKey((k) => k + 1);
    setPhase('form');
  };

  const errCount = Object.values(errors).filter(Boolean).length;

  const Err = ({id, msg}: {id: string; msg?: string}) =>
    msg ? (
      <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
        {msg}
      </p>
    ) : null;

  const a11y = (key: keyof Errors) => ({
    'aria-invalid': errors[key] ? (true as const) : undefined,
    'aria-describedby': errors[key] ? `q-${key}-error` : undefined
  });

  const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';

  if (phase === 'done') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl bg-white p-8 text-center text-ink shadow-xl outline-none sm:p-12"
      >
        <CircleCheck size={56} aria-hidden="true" className="mx-auto text-teal" />
        <h3 className="mt-5 text-2xl font-extrabold text-navy">{t('success.title')}</h3>
        <p className="mt-3 text-base text-ink">
          {t('success.refLabel')}{' '}
          <strong dir="ltr" className="inline-block rounded-md bg-sand px-2.5 py-0.5 font-extrabold tracking-wider text-navy">
            {ref}
          </strong>
        </p>
        <p className="mx-auto mt-2 max-w-md text-muted">{t('success.text')}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-lg bg-navy px-6 py-3 text-base font-bold text-white transition-colors hover:bg-navy-700"
        >
          {t('success.again')}
        </button>
        <p className="mt-6 text-xs text-muted">{t('note')}</p>
      </div>
    );
  }

  return (
    <form key={formKey} onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-5 text-ink shadow-xl sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <PortCombobox
          id="q-pol"
          label={t('fields.pol.label')}
          placeholder={t('fields.pol.placeholder')}
          options={options}
          value={values.pol}
          onChange={(v) => set('pol', v)}
          error={errors.pol}
          noResults={t('combo.noResults')}
          toggleLabel={t('combo.toggle')}
          inputClass={inputClass}
        />
        <PortCombobox
          id="q-pod"
          label={t('fields.pod.label')}
          placeholder={t('fields.pod.placeholder')}
          options={options}
          value={values.pod}
          onChange={(v) => set('pod', v)}
          error={errors.pod}
          noResults={t('combo.noResults')}
          toggleLabel={t('combo.toggle')}
          inputClass={inputClass}
        />

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>{t('fields.type.label')}</legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {CONTAINER_TYPES.map((c) => (
              <label
                key={c.id}
                className="relative flex cursor-pointer flex-col rounded-xl border border-slate-300 bg-white p-3 transition-colors hover:border-teal has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-teal/30"
              >
                <input
                  type="radio"
                  name="container-type"
                  value={c.id}
                  checked={values.type === c.id}
                  onChange={() => set('type', c.id)}
                  className="sr-only"
                />
                <span dir="ltr" className="block text-base font-extrabold rtl:text-end">
                  {c.name}
                </span>
                <span className="mt-0.5 text-xs opacity-75">{t(`typeDesc.${c.id}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="q-qty" className={labelClass}>
            {t('fields.qty.label')}
          </label>
          <div dir="ltr" className="flex h-12 w-full max-w-[11rem] overflow-hidden rounded-lg border border-slate-400 bg-white focus-within:ring-4 focus-within:ring-teal/25">
            <button
              type="button"
              aria-label={t('fields.qty.dec')}
              disabled={values.qty <= 1}
              onClick={() => set('qty', Math.max(1, values.qty - 1))}
              className="flex w-12 items-center justify-center text-navy hover:bg-sand disabled:opacity-40"
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <input
              id="q-qty"
              type="text"
              inputMode="numeric"
              value={values.qty || ''}
              onChange={(e) => {
                const n = parseInt(e.target.value.replace(/\D/g, ''), 10);
                set('qty', Number.isNaN(n) ? 0 : Math.min(n, 999));
              }}
              {...a11y('qty')}
              className="min-w-0 flex-1 border-x border-slate-300 bg-white text-center text-base font-bold text-ink outline-none"
            />
            <button
              type="button"
              aria-label={t('fields.qty.inc')}
              onClick={() => set('qty', Math.min(999, values.qty + 1))}
              className="flex w-12 items-center justify-center text-navy hover:bg-sand"
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
          <Err id="q-qty" msg={errors.qty} />
        </div>

        <div>
          <label htmlFor="q-date" className={labelClass}>
            {t('fields.date.label')}
          </label>
          <input
            id="q-date"
            type="date"
            dir="ltr"
            min={todayISO()}
            value={values.date}
            onChange={(e) => set('date', e.target.value)}
            {...a11y('date')}
            className={`${inputClass} rtl:text-end`}
          />
          <Err id="q-date" msg={errors.date} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-cargo" className={labelClass}>
            {t('fields.cargo.label')}
          </label>
          <input
            id="q-cargo"
            type="text"
            value={values.cargo}
            placeholder={t('fields.cargo.placeholder')}
            onChange={(e) => set('cargo', e.target.value)}
            {...a11y('cargo')}
            className={inputClass}
          />
          <Err id="q-cargo" msg={errors.cargo} />
        </div>

        <div>
          <label htmlFor="q-name" className={labelClass}>
            {t('fields.name.label')}
          </label>
          <input id="q-name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} {...a11y('name')} className={inputClass} />
          <Err id="q-name" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="q-company" className={labelClass}>
            {t('fields.company.label')}
          </label>
          <input id="q-company" type="text" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} {...a11y('company')} className={inputClass} />
          <Err id="q-company" msg={errors.company} />
        </div>
        <div>
          <label htmlFor="q-email" className={labelClass}>
            {t('fields.email.label')}
          </label>
          <input
            id="q-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            value={values.email}
            placeholder={t('fields.email.placeholder')}
            onChange={(e) => set('email', e.target.value)}
            {...a11y('email')}
            className={`${inputClass} rtl:text-end`}
          />
          <Err id="q-email" msg={errors.email} />
        </div>
        <div>
          <label htmlFor="q-phone" className={labelClass}>
            {t('fields.phone.label')}
          </label>
          <input
            id="q-phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            value={values.phone}
            placeholder={t('fields.phone.placeholder')}
            onChange={(e) => set('phone', e.target.value)}
            {...a11y('phone')}
            className={`${inputClass} rtl:text-end`}
          />
          <Err id="q-phone" msg={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="q-note" className={labelClass}>
            {t('fields.note.label')}
          </label>
          <textarea
            id="q-note"
            rows={3}
            value={values.note}
            placeholder={t('fields.note.placeholder')}
            onChange={(e) => set('note', e.target.value)}
            className={`${inputClass} h-auto py-3`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              id="q-kvkk"
              type="checkbox"
              checked={values.kvkk}
              onChange={(e) => set('kvkk', e.target.checked)}
              {...a11y('kvkk')}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[#0B1F3A]"
            />
            <span>{t('kvkk')}</span>
          </label>
          <Err id="q-kvkk" msg={errors.kvkk} />
        </div>
      </div>

      {errCount > 0 ? (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {t('errors.summary')}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={phase === 'sending'}
        aria-busy={phase === 'sending'}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-lg bg-orange px-8 text-base font-extrabold text-navy transition-colors hover:bg-[#f09a5c] disabled:cursor-wait disabled:opacity-80 sm:w-auto"
      >
        {phase === 'sending' ? (
          <>
            <LoaderCircle size={20} aria-hidden="true" className="animate-spin" />
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </button>

      <p className="mt-5 text-xs text-slate-600">{t('note')}</p>
    </form>
  );
}
