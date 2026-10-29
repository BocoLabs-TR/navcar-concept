import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Navcar',
  robots: {index: false, follow: false}
};

export default function RootRedirectLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
