/**
 * 珍奇植物市場 Vol.10 — 準備中
 * 公開URL: /chinkisyokubutsuichiba/vol10/
 *
 * 【決まったら埋めるところ】
 * - name / nameLines : イベント名（Vol.9 は "BOTANI CARNIVAL"）。決まるまで null
 * - year / days      : 開催年と開催日。days を入れると大きな日付が出て dateTbd は使われなくなる
 * - hours / venue / details : 時間・会場・その他の行（入場・グルメなど）
 * - lead             : リード文（明朝の大きめ文 + 補足）
 * - thumbnail        : 一覧ページのカードに出す画像（フライヤーの縦版など）
 * - flyer / photo    : client/public/images/vol10/ に画像を置いてファイル名を書く
 * - logo             : ナビ・フッターのイベントロゴ（images/vol10/ 配下）
 * - faqs             : よくある質問。空配列ならセクションごと出ない
 * - exhibitors       : ./exhibitors.ts（CSVから生成）を import して渡す
 * - boothMap         : ./boothMap.ts を import して渡す
 * - notice           : 準備中の案内。公開したら null にする
 */
import type { EventData } from "@/data/events/types";

export const vol10: EventData = {
  slug: "vol10",
  vol: 10,
  name: null,
  nameLines: [],
  subtitle: "珍奇植物市場 Vol.10",
  year: null,
  days: [],
  dateTbd: "開催日 調整中",
  hours: null,
  venue: null,
  details: [],
  lead: null,
  notice:
    "Vol.10 の開催概要は現在準備中です。日程・会場・出店業者が決まり次第、このページでお知らせします。",
  imageDir: "vol10",
  logo: null,
  thumbnail: null,
  flyer: null,
  photo: null,
  faqs: [],
  exhibitors: [],
  boothMap: null,
  description: "珍奇植物市場 Vol.10 の特設ページ。開催概要は準備中です。",
};
