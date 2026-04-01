import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin']
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const searchOptions = {
  api: `${basePath}/api/search`,
  type: basePath ? ('static' as const) : ('fetch' as const)
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ options: searchOptions }}>{children}</RootProvider>
      </body>
    </html>
  );
}
