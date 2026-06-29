import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import AppScripts from '@/components/AppScripts';

export const metadata: Metadata = {
  title: 'Finkaizen — Engineered Intelligence for Kaizen',
  description:
    'Finkaizen builds practical AI and analytics for banks and NBFCs — scorecards, statement analysis, early warning, recovery and PD AI services.',
  openGraph: {
    title: 'Finkaizen — Engineered Intelligence for Kaizen',
    description: 'AI and analytics for credit risk, collections and personal finance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="cursor-glow" id="cursorGlow"></div>
        <Nav />
        {children}
        <AppScripts />
      </body>
    </html>
  );
}
