/**
 * 珍奇植物市場 Vol.9「BOTANI CARNIVAL」 — 2026年8月29日(土)・30日(日)
 * 公開URL: /chinkisyokubutsuichiba/vol9/
 */
import type { EventData } from "@/data/events/types";
import { exhibitors } from "./exhibitors";
import { boothMap } from "./boothMap";

export const vol9: EventData = {
  slug: "vol9",
  vol: 9,
  name: "BOTANI CARNIVAL",
  nameLines: ["BOTANI", "CARNIVAL"],
  subtitle: "珍奇植物市場 Vol.9",
  year: 2026,
  days: [
    {
      id: 1,
      date: "2026-08-29",
      label: "8/29（土）",
      short: "8/29",
      display: "8.29",
      weekday: "SAT",
      long: "8月29日（土）",
    },
    {
      id: 2,
      date: "2026-08-30",
      label: "8/30（日）",
      short: "8/30",
      display: "8.30",
      weekday: "SUN",
      long: "8月30日（日）",
    },
  ],
  dateTbd: null,
  hours: { value: "11:00 – 16:00", note: "両日共通" },
  venue: {
    name: "西原さわふじ広場",
    note: "西原さわふじマルシェ",
    mapUrl: "https://maps.app.goo.gl/8soxNcdA9EZiwg8H6",
  },
  details: [
    { label: "入場", value: "無料", note: "どなたでもご来場いただけます" },
    { label: "グルメ", value: "キッチンカー出店", note: "フード・ドリンク・スイーツ" },
  ],
  lead: {
    heading: ["今年の珍奇植物市場は、いつもとはひと味違う。", "会場全体が植物たちのカーニバルに──"],
    body: "色鮮やかな装飾、フォトスポット、そして集まる珍奇植物たち。見て、出会って、お気に入りの1株を探す2日間。初心者の方からコレクターまで楽しめる、8月最後の植物イベントです。",
  },
  notice: null,
  imageDir: "vol9",
  logo: "logo-event-144.png",
  thumbnail: "flyer-sp.jpg",
  flyer: {
    pc: "flyer-pc.jpg",
    sp: "flyer-sp.jpg",
    alt: "BOTANI CARNIVAL 珍奇植物市場 Vol.9 フライヤー。2026年8月29日（土）・30日（日）11:00〜16:00、西原さわふじ広場にて開催。入場無料。",
    aspectSp: "1054/1492",
    aspectPc: "1448/1086",
  },
  photo: {
    file: "kitchen-car.webp",
    alt: "キッチンカー",
    caption: "キッチンカーも出店。植物と一緒にグルメもお楽しみください。",
  },
  faqs: [
    {
      q: "入場料はかかりますか？",
      a: "入場は無料です。どなたでもお気軽にご来場いただけます。初めての方も、植物に詳しくない方も大歓迎です！",
    },
    {
      q: "駐車場はありますか？",
      a: "西原さわふじ広場には駐車場がございます。ただし、混雑が予想されますので、公共交通機関のご利用もご検討ください。詳細は会場の公式情報をご確認ください。",
    },
    {
      q: "雨天の場合はどうなりますか？",
      a: "小雨の場合は開催予定です。荒天の場合は主催者のInstagram（@tanikunchu）にてお知らせいたします。当日の朝にご確認ください。",
    },
    {
      q: "ペットを連れて入場できますか？",
      a: "ペット同伴でのご来場は、他のお客様や植物への影響を考慮し、ご遠慮いただいております。ご理解のほどよろしくお願いいたします。",
    },
    {
      q: "購入した植物はどうやって持ち帰ればいいですか？",
      a: "エコバッグやマイカゴのご持参にご協力ください。会場でご用意できる袋には限りがございます。鉢植えは倒れると土がこぼれてしまうため、底が広くて安定するトートバッグや、浅めのカゴ・段ボール箱がおすすめです。",
    },
    {
      q: "出店に興味があるのですが、どうすればよいですか？",
      a: "出店のお問い合わせは、主催者のInstagram（@tanikunchu）のDMよりご連絡ください。次回以降のイベントへのご参加についてもお気軽にご相談ください。",
    },
  ],
  exhibitors,
  boothMap,
  description:
    "植物が主役の真夏の祭典。2026年8月29日（土）・30日（日）11:00〜16:00、西原さわふじ広場にて開催。入場無料。",
};
