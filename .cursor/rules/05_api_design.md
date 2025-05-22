# API設計書: フリーランスエージェント向け人材・案件マッチングシステム

## 概要
本システムのAPIは、Next.jsのAPI RoutesおよびSupabaseのバックエンドを利用し、RESTfulな設計とします。認証はJWTまたはNextAuth.jsを利用し、必要に応じてRBACでアクセス制御を行います。

---

## 認証・認可
- JWTまたはNextAuth.jsによる認証
- ロールベースアクセス制御（admin/agent）

---

## エンドポイント一覧
- 認証
- ユーザー管理
- 人材管理
- 案件管理
- クライアント企業管理
- マッチング
- 通知
- ファイル管理

---

## 1. 認証
### POST /api/auth/login
- 概要: ログイン（メール・パスワード）
- リクエスト: { email: string, password: string }
- レスポンス: { token: string, user: { ... } }
- 認証: 不要

### POST /api/auth/logout
- 概要: ログアウト
- リクエスト: なし
- レスポンス: { message: "logged out" }
- 認証: 必要

### POST /api/auth/register
- 概要: 新規ユーザー登録
- リクエスト: { name: string, email: string, password: string }
- レスポンス: { token: string, user: { ... } }
- 認証: 不要

---

## 2. ユーザー管理
### GET /api/users
- 概要: ユーザー一覧取得
- レスポンス: [ { id, name, email, role, ... } ]
- 認証: adminのみ

### GET /api/users/{id}
- 概要: ユーザー詳細取得
- レスポンス: { id, name, email, role, ... }
- 認証: admin/agent

### POST /api/users
- 概要: ユーザー新規作成
- リクエスト: { name, email, role, password }
- レスポンス: { id, ... }
- 認証: adminのみ

### PUT /api/users/{id}
- 概要: ユーザー情報更新
- リクエスト: { name?, email?, role?, password? }
- レスポンス: { id, ... }
- 認証: admin/本人

### DELETE /api/users/{id}
- 概要: ユーザー削除
- レスポンス: { message }
- 認証: adminのみ

---

## 3. 人材管理
### GET /api/talents
- 概要: 人材一覧取得（検索・絞り込み対応）
- クエリ: name, skills, experience_years, ...
- レスポンス: [ { id, name, skills, ... } ]
- 認証: 必要

### GET /api/talents/{id}
- 概要: 人材詳細取得
- レスポンス: { id, name, ... }
- 認証: 必要

### POST /api/talents
- 概要: 人材新規登録
- リクエスト: { name, contact, skills, ... }
- レスポンス: { id, ... }
- 認証: 必要

### PUT /api/talents/{id}
- 概要: 人材情報更新
- リクエスト: { ... }
- レスポンス: { id, ... }
- 認証: 必要

### DELETE /api/talents/{id}
- 概要: 人材削除
- レスポンス: { message }
- 認証: 必要

---

## 4. 案件管理
### GET /api/projects
- 概要: 案件一覧取得（検索・絞り込み対応）
- クエリ: name, client_id, required_skills, ...
- レスポンス: [ { id, name, ... } ]
- 認証: 必要

### GET /api/projects/{id}
- 概要: 案件詳細取得
- レスポンス: { id, name, ... }
- 認証: 必要

### POST /api/projects
- 概要: 案件新規登録
- リクエスト: { name, client_id, required_skills, ... }
- レスポンス: { id, ... }
- 認証: 必要

### PUT /api/projects/{id}
- 概要: 案件情報更新
- リクエスト: { ... }
- レスポンス: { id, ... }
- 認証: 必要

### DELETE /api/projects/{id}
- 概要: 案件削除
- レスポンス: { message }
- 認証: 必要

---

## 5. クライアント企業管理
### GET /api/clients
- 概要: クライアント企業一覧取得
- レスポンス: [ { id, name, ... } ]
- 認証: 必要

### GET /api/clients/{id}
- 概要: クライアント企業詳細取得
- レスポンス: { id, name, ... }
- 認証: 必要

### POST /api/clients
- 概要: クライアント企業新規登録
- リクエスト: { name, contact_person, ... }
- レスポンス: { id, ... }
- 認証: 必要

### PUT /api/clients/{id}
- 概要: クライアント企業情報更新
- リクエスト: { ... }
- レスポンス: { id, ... }
- 認証: 必要

### DELETE /api/clients/{id}
- 概要: クライアント企業削除
- レスポンス: { message }
- 認証: 必要

---

## 6. マッチング
### POST /api/match/talent-to-projects
- 概要: 指定人材におすすめ案件をAIでレコメンド
- リクエスト: { talent_id }
- レスポンス: [ { project_id, match_score, recommendation, summary } ]
- 認証: 必要

### POST /api/match/project-to-talents
- 概要: 指定案件におすすめ人材をAIでレコメンド
- リクエスト: { project_id }
- レスポンス: [ { talent_id, match_score, recommendation, summary } ]
- 認証: 必要

### GET /api/matches
- 概要: マッチング結果一覧取得
- クエリ: talent_id, project_id, status, ...
- レスポンス: [ { id, talent_id, project_id, match_score, ... } ]
- 認証: 必要

### GET /api/matches/{id}
- 概要: マッチング詳細取得
- レスポンス: { id, talent_id, project_id, match_score, recommendation, summary, ... }
- 認証: 必要

---

## 7. 通知
### GET /api/notifications
- 概要: 通知一覧取得
- レスポンス: [ { id, user_id, content, ... } ]
- 認証: 必要

### PUT /api/notifications/{id}/read
- 概要: 通知を既読にする
- レスポンス: { id, is_read }
- 認証: 必要

---

## 8. ファイル管理
### POST /api/files
- 概要: ファイルアップロード
- リクエスト: multipart/form-data (file, user_id, file_type)
- レスポンス: { id, url, ... }
- 認証: 必要

### GET /api/files/{id}
- 概要: ファイル情報取得
- レスポンス: { id, url, ... }
- 認証: 必要

---

## 備考
- 各APIは認証・認可を必須とし、RBACでアクセス制御
- エラーレスポンスは { error: string, code: number } 形式
- LLM連携APIはOpenAI APIをサーバー側で呼び出し、クライアントにはAPIキーを渡さない
- 必要に応じてページネーション・ソート・フィルタリング対応 