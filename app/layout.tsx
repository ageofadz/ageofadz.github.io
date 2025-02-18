import './globals.css';
import type { Metadata } from 'next';
import { Sono } from 'next/font/google'
import { Roboto } from 'next/font/google'
import { Lexend } from 'next/font/google'

import { Navbar } from './components/nav';
import { SandpackCSS } from './blog/[slug]/sandpack';
import { Links } from './components/links';

const sono = Sono({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-mono',
})
const michrono = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-michroma',
  weight: '400',
})
const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: '300',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://samrobertson.dev'),
  title: {
    default: 'Sam Robertson',
    template: '%s | Sam Robertson',
  },
  description: 'I love building stuff.',
  openGraph: {
    title: 'Sam Robertson',
    description: 'I love building stuff.',
    url: 'https://samrobertson.dev',
    siteName: 'Sam Robertson',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Sam Robertson',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white',
        roboto.variable,
        sono.variable,
        michrono.variable
      )}
    >
      <head>
        <SandpackCSS />
      </head>
      <body>   
          {children}
      </body>
    </html>
  );
}
