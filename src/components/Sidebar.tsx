import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => (
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
);

export default Sidebar; 