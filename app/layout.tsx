import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/features/header';
import { BaseProviders } from '@/providers';
import { Toaster } from '@/components/ui';
import { KnowledgeBasePollingProviders } from '@/providers/KnowledgeBasePollingProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'File Picker',
  description: 'A file picker for the web',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BaseProviders>
          <KnowledgeBasePollingProviders />
          <div className={'flex flex-col gap-4 p-4'}>
            <Header />
            {children}
            <Toaster position="top-center" />
          </div>
        </BaseProviders>
      </body>
    </html>
  );
}
