import React from 'react';
import Link from 'next/link';
import ReduxProvider from '../store/ReduxProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ minHeight: '100vh', margin: 0 }}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
} 