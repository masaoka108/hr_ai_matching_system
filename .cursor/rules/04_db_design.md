# DB設計書: フリーランスエージェント向け人材・案件マッチングシステム

## 概要
本システムは、フリーランス人材と案件のマッチングを効率化するためのWebアプリケーションです。Supabase（PostgreSQLベース）を利用し、主要なエンティティを以下の通り設計します。

---

## テーブル一覧
- users（ユーザー）
- talents（人材）
- projects（案件）
- matches（マッチング結果）
- clients（クライアント企業）
- notifications（通知）
- files（ファイル管理）

---

## users（ユーザー）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | ユーザーID           |
| name             | varchar(100)    | NOT NULL       | 氏名                 |
| email            | varchar(255)    | UNIQUE, NOT NULL | メールアドレス     |
| role             | varchar(20)     | NOT NULL       | ロール（admin/agent）|
| password_hash    | varchar(255)    |                | パスワードハッシュ   |
| created_at       | timestamp       | DEFAULT now()  | 登録日時             |
| updated_at       | timestamp       |                | 更新日時             |

---

## talents（人材）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | 人材ID               |
| name             | varchar(100)    | NOT NULL       | 氏名                 |
| contact          | varchar(255)    |                | 連絡先               |
| skills           | text[]          |                | スキルセット         |
| experience_years | integer         |                | 経験年数             |
| desired_rate     | integer         |                | 希望単価（円）       |
| work_style       | varchar(20)     |                | 希望稼働形態         |
| available_from   | date            |                | 稼働可能時期         |
| notes            | text            |                | 備考                 |
| resume_url       | varchar(255)    |                | 履歴書ファイルURL    |
| created_at       | timestamp       | DEFAULT now()  | 登録日時             |
| updated_at       | timestamp       |                | 更新日時             |

---

## projects（案件）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | 案件ID               |
| name             | varchar(100)    | NOT NULL       | 案件名               |
| client_id        | uuid            | FK(clients.id) | クライアント企業ID   |
| required_skills  | text[]          |                | 必要スキル           |
| description      | text            |                | 業務内容             |
| location         | varchar(100)    |                | 勤務地               |
| reward           | integer         |                | 報酬（円）           |
| start_date       | date            |                | 稼働開始日           |
| notes            | text            |                | 備考                 |
| created_at       | timestamp       | DEFAULT now()  | 登録日時             |
| updated_at       | timestamp       |                | 更新日時             |

---

## matches（マッチング結果）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | マッチングID         |
| talent_id        | uuid            | FK(talents.id) | 人材ID               |
| project_id       | uuid            | FK(projects.id)| 案件ID               |
| match_score      | numeric(5,2)    |                | マッチ度スコア       |
| status           | varchar(20)     |                | ステータス           |
| recommendation   | text            |                | 推薦理由（LLM生成）  |
| summary          | text            |                | 要約（LLM生成）      |
| created_at       | timestamp       | DEFAULT now()  | 登録日時             |
| updated_at       | timestamp       |                | 更新日時             |

---

## clients（クライアント企業）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | クライアント企業ID   |
| name             | varchar(100)    | NOT NULL       | 企業名               |
| contact_person   | varchar(100)    |                | 担当者名             |
| contact_email    | varchar(255)    |                | 担当者メール         |
| phone            | varchar(50)     |                | 電話番号             |
| notes            | text            |                | 備考                 |
| created_at       | timestamp       | DEFAULT now()  | 登録日時             |
| updated_at       | timestamp       |                | 更新日時             |

---

## notifications（通知）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | 通知ID               |
| user_id          | uuid            | FK(users.id)   | 対象ユーザーID       |
| content          | text            |                | 通知内容             |
| target_type      | varchar(20)     |                | 対象種別（人材/案件）|
| target_id        | uuid            |                | 対象ID               |
| is_read          | boolean         | DEFAULT false  | 既読フラグ           |
| created_at       | timestamp       | DEFAULT now()  | 発生日時             |

---

## files（ファイル管理）
| カラム名         | 型              | 制約           | 説明                 |
|------------------|-----------------|----------------|----------------------|
| id               | uuid            | PK             | ファイルID           |
| user_id          | uuid            | FK(users.id)   | アップロードユーザー |
| url              | varchar(255)    |                | ファイルURL          |
| file_type        | varchar(50)     |                | ファイル種別         |
| created_at       | timestamp       | DEFAULT now()  | アップロード日時     |

---

## インデックス・リレーション
- 各テーブルの主キー（PK）はid（uuid）
- 外部キー（FK）は適切に設定
- talents.skills, projects.required_skills にはGINインデックス推奨
- matchesテーブルはtalent_id, project_idで複合インデックス推奨

---

## 備考
- SupabaseのRow Level Security（RLS）を活用し、ユーザーごとのアクセス制御を実施
- ファイルはSupabase Storageまたは外部ストレージ（S3等）に保存
- LLMによる推薦理由・要約はmatchesテーブルに格納
- 今後の拡張に備え、柔軟なスキーマ設計とする
