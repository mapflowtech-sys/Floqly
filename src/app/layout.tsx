import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Вывод: шрифт Inter с поддержкой кириллицы для русского текста
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
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
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
