import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Providers } from './providers';
import { Breadcrumb } from '@/components/ui/breadcrumb/breadcrumb';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import config from '../../../configs.json'
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

const poppins = Poppins({ weight: ['400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MigStore',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="h-full w-full">
      <body className={`${poppins.className} bg-zinc-200 dark:bg-zinc-950 `}>
        <Providers>
          <GoogleOAuthProvider clientId={config.googleAuthId}>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <main>
                <Breadcrumb />
                {children}
              </main>
              <Footer />
            </NextIntlClientProvider>
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}