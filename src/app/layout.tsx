import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ display: 'flex', minHeight: '100vh', margin: 0 }}>
        <aside style={{ width: 220, background: '#f5f5f5', padding: 24 }}>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/dashboard">ダッシュボード</Link></li>
              <li><Link href="/talents">人材管理</Link></li>
              <li><Link href="/projects">案件管理</Link></li>
              <li><Link href="/matches">マッチング結果</Link></li>
              <li><Link href="/clients">クライアント企業</Link></li>
              <li><Link href="/users">ユーザー管理</Link></li>
              <li><Link href="/notifications">通知</Link></li>
              <li><Link href="/reports">レポート</Link></li>
              <li><Link href="/login">ログアウト</Link></li>
            </ul>
          </nav>
        </aside>
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </body>
    </html>
  );
} 