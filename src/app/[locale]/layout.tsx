import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import SmoothScroll from '@/components/ui/smooth-scroll';
import { Toaster } from '@/components/ui/toaster';

const font = Lato({ weight: ['400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MigStore',
  description: 'MigStore is an ecommerce website template',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="h-full w-full">
      <body
        className={`${font.className} bg-zinc-200 dark:bg-zinc-950 min-h-screen overflow-x-hidden`}
      >
        <Providers>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ''}>
            <NextIntlClientProvider messages={messages}>
              <SmoothScroll>
                <Header />
                <main>{children}</main>
                <Toaster />
                <Footer />
              </SmoothScroll>
            </NextIntlClientProvider>
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
