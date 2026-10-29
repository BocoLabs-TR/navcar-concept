import type {Metadata, Viewport} from 'next';
import {IBM_Plex_Sans_Arabic, Manrope} from 'next/font/google';
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import '../globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap'
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  preload: false, // only fetched when the Arabic page actually uses it
  variable: '--font-arabic',
  display: 'swap'
});

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  return {
    title: t('title'),
    description: t('description'),
    robots: {index: false, follow: false}
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isAr = locale === 'ar';
  const t = await getTranslations({locale, namespace: 'nav'});

  return (
    <html
      lang={locale}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`${manrope.variable} ${isAr ? plexArabic.variable : ''}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
        >
          {t('skip')}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
