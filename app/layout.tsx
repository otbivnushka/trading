import type { Metadata } from 'next';
import { ThemeProvider } from '@/shared/components/shared/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Трейдинговая панель',
  description: 'Тестовое задание',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
