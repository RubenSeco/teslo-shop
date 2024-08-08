import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import './globals.css';
import { Providers } from '@/components';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop'
  },
  description: 'Tienda virtual de productos',
  icons: {
    icon: [
      {
        url: '/images/favicon.ico', // /public path
        href: '/images/favicon.ico' // /public path
      }
    ]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </head>

      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      {/* inter.classname: Configuración del font family por default para toda la aplicación */}
    </html>
  );
}
