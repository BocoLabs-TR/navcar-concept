import {setRequestLocale} from 'next-intl/server';
import {About} from '@/components/About';
import {ConceptBadge} from '@/components/ConceptBadge';
import {Contact} from '@/components/Contact';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {Hero} from '@/components/Hero';
import {QuoteSection} from '@/components/QuoteSection';
import {Routes} from '@/components/Routes';
import {Services} from '@/components/Services';
import {WhatsApp} from '@/components/WhatsApp';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <div id="top" />
      <ConceptBadge />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Routes />
        <QuoteSection />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
