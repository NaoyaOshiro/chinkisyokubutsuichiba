# 🌵 珍奇植物市場 公式サイト

沖縄の珍奇植物イベント **珍奇植物市場** のサイトです。
ルートが開催回の一覧で、その配下に開催回ごとの特設ページがぶら下がります。

```
/                 開催一覧（過去回 + 次回）
├── /vol9/        珍奇植物市場 Vol.9「BOTANI CARNIVAL」（2026年8月29日・30日）
└── /vol10/       珍奇植物市場 Vol.10（準備中）
```

公開URL: **https://naoyaoshiro.github.io/chinkisyokubutsuichiba/**

---

## 🛠 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 19 + TypeScript |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | shadcn/ui + Radix UI |
| ルーティング | wouter |
| ビルドツール | Vite（ページごとのHTML + 共通バンドル） |
| パッケージマネージャー | pnpm |
| ホスティング | GitHub Pages（GitHub Actions で自動デプロイ） |

---

## 📁 ディレクトリ構成

```
chinkisyokubutsuichiba/
├── client/
│   ├── index.html            # ルート（開催一覧）のHTML・OGP
│   ├── vol9/index.html       # Vol.9 のHTML・OGP
│   ├── vol10/index.html      # Vol.10 のHTML・OGP
│   ├── public/images/
│   │   ├── site/             # 開催回に依らない画像（favicon・OG・no_image）
│   │   ├── vol9/             # Vol.9 のフライヤー・ロゴ・出店者画像
│   │   └── vol10/            # Vol.10 の画像（これから）
│   └── src/
│       ├── data/
│       │   ├── site.ts       # サイト共通設定（シリーズ名・主催者IG・公開URL）
│       │   └── events/
│       │       ├── types.ts  # EventData ほか開催回の型
│       │       ├── index.ts  # 開催回の一覧（新しい回が先頭）
│       │       ├── vol9/     # index.ts（イベント情報） / exhibitors.ts / boothMap.ts
│       │       └── vol10/    # index.ts（準備中の雛形）
│       ├── contexts/
│       │   └── EventContext.tsx  # 表示中の開催回を各セクションに配る
│       ├── pages/
│       │   ├── Top.tsx       # ルート（開催一覧）
│       │   ├── EventPage.tsx # 開催回ごとの特設ページ
│       │   └── NotFound.tsx
│       ├── components/
│       │   ├── sections/     # Hero / EventInfo / BoothMap / Exhibitors / Faq / Contact
│       │   └── ui/           # shadcn/ui
│       ├── lib/
│       │   ├── asset.ts      # base を考慮した静的アセットのパス解決
│       │   ├── exhibitor.ts  # 出店者データのヘルパー（画像パス・日程バッジ）
│       │   ├── sections.ts   # その回で出すセクションの判定
│       │   ├── meta.ts       # SPA内移動時の <title> 更新
│       │   └── analytics.ts  # GA4 カスタムイベント
│       ├── App.tsx           # ルーティング
│       └── index.css         # カラーパレット・共通スタイル
├── server/                   # 静的ファイルサーバー（Express・ローカル確認用）
└── shared/
```

### 「1つのSPA + 開催回ごとのHTML」という構成について

コンポーネントは全開催回で共通（1つのバンドル）ですが、HTML だけ回ごとに分けています。
集客の主経路が Instagram DM・ストーリーズ・LINE で、**シェアしたときにその回のフライヤーと
タイトルが出ること**が重要なためです。OGP はクローラが HTML を直接読むので、SPA の中で
書き換えても間に合いません。

---

## ➕ 新しい開催回（Vol.11）を追加する手順

1. `client/src/data/events/vol11/index.ts` を作る（`vol10/index.ts` が雛形）
   - 出店者・ブースマップがあれば `exhibitors.ts` / `boothMap.ts` も同じフォルダに置いて import する
2. 画像を `client/public/images/vol11/` に置く
3. `client/src/data/events/index.ts` の `events` 配列の **先頭** に足す
4. `client/vol11/index.html` を作る（`vol10/index.html` をコピーして title・description・canonical・og を直す）
5. `vite.config.ts` の `pages` に `vol11: "client/vol11/index.html"` を足す

データが未確定の回は、該当セクション（フライヤー・ブースマップ・出店紹介・FAQ）が
自動で出なくなります。`notice` に準備中の案内を書いておき、公開時に `null` に戻します。

---

## ✏️ 開催回の内容を直す

画面に出る文言・日程・会場・画像は、すべて `client/src/data/events/<vol>/index.ts`（`EventData`）が
持っています。コンポーネント側に直書きされた文言はありません。

| 直したいもの | 場所 |
|---|---|
| イベント名・日程・会場・時間・入場など | `events/<vol>/index.ts` |
| リード文・お知らせ | 同上（`lead` / `notice`） |
| よくある質問 | 同上（`faqs`） |
| 出店業者 | `events/<vol>/exhibitors.ts` |
| ブース配置 | `events/<vol>/boothMap.ts` |
| 主催者Instagram・制作クレジット・シリーズ名 | `client/src/data/site.ts` |
| OGP・ページタイトル（シェア時に出るもの） | `client/<vol>/index.html` |

---

## 🚀 開発環境のセットアップ

```bash
pnpm install
pnpm dev
```

開発サーバーは `http://localhost:3000` で起動します。
開催一覧は `/`、各回は `/vol9/` `/vol10/` です。

```bash
pnpm build    # 本番ビルド
pnpm check    # 型チェック
```

---

## 🌐 デプロイ（GitHub Pages）

`main` ブランチに push すると、GitHub Actions（`.github/workflows/deploy.yml`）が
自動でビルドして GitHub Pages に公開します。

### 初回のみ必要な設定

リポジトリの **Settings → Pages → Build and deployment → Source** を
**「GitHub Actions」** に設定してください（一度だけ）。

### 仕組み・注意点

- プロジェクトページはサブパス（`/chinkisyokubutsuichiba/`）で配信されるため、Vite の `base` を
  本番ビルド時のみ `/chinkisyokubutsuichiba/` に設定しています（`vite.config.ts`）。
- 画像などの静的アセットは `asset()` ヘルパー、クライアントルーティングは wouter の `base` により、
  サブパスでも正しく解決されます。
- 開催回ごとに実ファイル（`/vol9/index.html`）を書き出すので、URL は末尾スラッシュ付きになります。
  wouter 側はこれを吸収しています（`App.tsx` の `useNormalizedLocation`）。
- 存在しないパスは `404.html`（ルートHTMLのコピー）経由で SPA の 404 ページに落ちます。
- **公開URL（リポジトリ名やドメイン）を変えるときは次の3か所を揃えること**
  - `vite.config.ts` の `base`
  - `client/**/index.html` の `canonical` / `og:url` / `og:image`
  - `client/src/data/site.ts` の `url`
- 独自ドメイン（ルート直下配信）に移す場合は、ビルド時に `VITE_BASE_PATH=/` を指定します。

---

## 🖼 画像の置き場所

| 置き場所 | 中身 |
|---|---|
| `client/public/images/site/` | favicon・apple-touch-icon・シェア用OG画像・no_image（開催回に依らないもの） |
| `client/public/images/<vol>/` | フライヤー（PC/SP）・OG画像・イベントロゴ・写真バナー |
| `client/public/images/<vol>/exhibitors/<slug>/` | 出店者のアイコン（`icon.*`）と商品画像（`1.*`, `2.*`, …） |

コードからは `asset("images/...")`（`client/src/lib/asset.ts`）経由で参照します。
GitHub Pages のサブパス配信に対応するためです。

---

## 📝 出店業者データ

`client/src/data/events/<vol>/exhibitors.ts` の配列を編集します。
このファイルは `tmp/出店者情報.csv` と `tmp/出店者情報（画像）/` から生成しているため、
再生成すると手動の編集は失われます。

```ts
{
  name: string,             // 屋号
  instagram: string | null, // Instagramハンドル（@なし）。null ならリンクなし
  description: string,      // 紹介文
  days: number[],           // 出店日（1 = 1日目, 2 = 2日目）
  slug: string | null,      // 画像フォルダ名（images/<vol>/exhibitors/<slug>/）
  icon: string | null,      // アイコン画像のファイル名
  images: string[],         // 商品画像のファイル名
  kitchen: boolean,         // キッチンカーかどうか
}
```

`instagram` がブースマップ（`boothMap.ts`）の区画名と一致すると、
区画に屋号・アイコン・詳細ダイアログが自動でつながります。

---

## 📬 お問い合わせ

イベントに関するお問い合わせは [@tanikunchu](https://www.instagram.com/tanikunchu/) の
Instagram DM までお願いします。

サイト制作: [おーしろ製作所](https://www.instagram.com/oshiro_factory/)
