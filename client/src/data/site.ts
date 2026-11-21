/**
 * サイト全体（珍奇植物市場）の共通設定。
 * 開催回ごとに変わるものは client/src/data/events/<slug>/ 側に置く。
 */
export const site = {
  /** シリーズ名。ルートの一覧ページとページタイトルの軸になる */
  name: "珍奇植物市場",
  /** 英字の添え字（Overline などに使う） */
  nameEn: "Chinki Shokubutsu Ichiba",
  /** 一覧ページのリード文 */
  tagline: "沖縄の珍奇植物イベント。開催ごとの特設ページをここにまとめています。",
  /** meta description */
  description:
    "沖縄で開催している珍奇植物のイベント「珍奇植物市場」の公式サイト。開催回ごとの出店業者・ブースマップ・会場情報をまとめています。",
  /** 主催者のInstagramハンドル（@なし） */
  organizerInstagram: "tanikunchu",
  /** 制作クレジット */
  credit: {
    name: "おーしろ製作所",
    instagram: "oshiro_factory",
  },
  /**
   * 本番の公開URL（末尾スラッシュあり）。
   * 各 HTML の canonical / og:url はビルド時に書き換えられないため直書きしている。
   * リポジトリ名やドメインを変えるときは、ここと client/**\/index.html の
   * canonical・og:url・og:image、vite.config.ts の base を揃えて直すこと。
   */
  url: "https://naoyaoshiro.github.io/chinkisyokubutsuichiba/",
} as const;
