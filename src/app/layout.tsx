import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import ToastContainer from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'Labor Desk - On-Demand Blue-Collar Workforce Management Platform',
  description: 'Enterprise workforce management platform connecting corporate clients with physically verified blue-collar labor on-demand.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
