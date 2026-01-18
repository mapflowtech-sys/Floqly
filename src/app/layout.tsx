import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Caveat } from 'next/font/google';
import './globals.css';

// Вывод: Cormorant Garamond для заголовков - утончённый serif близкий к референсу
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Вывод: IBM Plex Mono для UI-элементов и логотипа
const mono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

// Вывод: Caveat для рукописной надписи
const handwriting = Caveat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-handwriting',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Floqly - Умный виджет для увеличения конверсии',
  description: 'Проактивный AI-ассистент, который понимает ваш бизнес и общается с клиентами 24/7',
  keywords: ['виджет для сайта', 'умный чат', 'увеличение конверсии', 'AI ассистент', 'чат-бот'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${mono.variable} ${handwriting.variable}`}>
      <body className={mono.className}>{children}</body>
    </html>
  );
}
