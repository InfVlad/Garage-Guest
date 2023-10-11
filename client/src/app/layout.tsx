import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './_Providers/ThemeProvider';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

const tauz = localFont({ src: '../assets/TauzSerif/tautz.ttf', display: 'swap' });

export const metadata: Metadata = {
  title: 'SGMT',
  description: 'Sistema de Manejo de Taller',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={tauz.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Toaster position='top-center' richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
