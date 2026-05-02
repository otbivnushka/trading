import type { Metadata } from 'next';
import { ThemeProvider } from '@/shared/components/shared/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trading panel',
  description: 'Trading panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full overflow-hidden bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
            <div className="h-dvh flex flex-col">
              {children}
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
