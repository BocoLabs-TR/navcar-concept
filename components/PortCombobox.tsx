'use client';

import {ChevronDown} from 'lucide-react';
import {useId, useMemo, useRef, useState, useEffect} from 'react';

/** `search` holds every searchable name (all locales + extra keywords), shown name stays `name`. */
export type PortOption = {id: string; name: string; country: string; search: string};

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ًͯ-ٟـ]/g, '')
    .replace(/ı/g, 'i')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .trim();
}

type Props = {
  id: string;
  label: string;
  placeholder: string;
  options: PortOption[];
  value: string;
  onChange: (id: string) => void;
  error?: string;
  noResults: string;
  toggleLabel: string;
  inputClass: string;
};

export function PortCombobox({id, label, placeholder, options, value, onChange, error, noResults, toggleLabel, inputClass}: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = options.find((o) => o.id === value);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = normalize(text);
    if (!q || (selected && text === `${selected.name}, ${selected.country}`)) return options;
    return options.filter((o) => normalize(`${o.name} ${o.country} ${o.search}`).includes(q));
  }, [text, options, selected]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView?.({block: 'nearest'});
  }, [active, open]);

  const choose = (o: PortOption) => {
    onChange(o.id);
    setText(`${o.name}, ${o.country}`);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      // never submit the form from inside the combobox
      e.preventDefault();
      if (open && filtered[active]) choose(filtered[active]);
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    } else if (e.key === 'Home' && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End' && open) {
      e.preventDefault();
      setActive(Math.max(filtered.length - 1, 0));
    }
  };

  const activeId = open && filtered[active] ? `${listId}-${active}` : undefined;

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setOpen(false);
        if (selected) setText(`${selected.name}, ${selected.country}`);
      }}
    >
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          placeholder={placeholder}
          value={text}
          className={`${inputClass} pe-11`}
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            setActive(0);
            if (value) onChange('');
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={toggleLabel}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setOpen((v) => !v);
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 end-0 flex w-11 items-center justify-center text-muted"
        >
          <ChevronDown size={18} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={label}
        hidden={!open}
        className="absolute inset-x-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-lg border border-navy/15 bg-white py-1 shadow-xl"
      >
        {filtered.length === 0 ? (
          <li role="presentation" className="px-4 py-3 text-sm text-muted">
            {noResults}
          </li>
        ) : (
          filtered.map((o, i) => (
            <li
              key={o.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={o.id === value}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(o)}
              onMouseMove={() => setActive(i)}
              className={`flex cursor-pointer items-baseline justify-between gap-3 px-4 py-2.5 text-sm ${
                i === active ? 'bg-navy text-white' : 'text-ink'
              } ${o.id === value ? 'font-bold' : ''}`}
            >
              <span>{o.name}</span>
              <span className={`text-xs ${i === active ? 'text-white/75' : 'text-muted'}`}>{o.country}</span>
            </li>
          ))
        )}
      </ul>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
