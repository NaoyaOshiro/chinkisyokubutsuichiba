/**
 * イベント（開催回）1回ぶんのデータ構造。
 *
 * 珍奇植物市場は回ごとにイベント名・日程・会場・出店者が変わるため、
 * 画面に出る文言はすべてこの型に集約し、コンポーネント側には持たせない。
 * 新しい回を追加するときは client/src/data/events/<slug>/ を作って
 * EventData を1つ export し、events/index.ts の配列に足すだけで済む。
 */

/** 出店業者1者ぶん。CSVから生成した vol ごとの exhibitors.ts が持つ。 */
export interface Exhibitor {
  /** 屋号（未登録の場合はInstagramハンドルを流用） */
  name: string;
  /** Instagramハンドル（@なし）。null ならリンクなし */
  instagram: string | null;
  /** 紹介文 */
  description: string;
  /** 出店日（EventDay.id と対応。両日なら [1, 2]） */
  days: number[];
  /** 画像フォルダ名（images/<imageDir>/exhibitors/<slug>/）。null なら画像なし */
  slug: string | null;
  /** アイコン画像ファイル名（例: icon.jpg）。null なら no_image */
  icon: string | null;
  /** 商品画像ファイル名の配列（例: ["1.jpg","2.jpg"]）。空なら no_image */
  images: string[];
  /** キッチンカーかどうか */
  kitchen: boolean;
}

/**
 * 開催日1日ぶん。
 *
 * id は出店者データの days や index.css の日程カラートークン（--day-1 / --day-2）と
 * 対応する連番。index.css が持つのは1と2なので、3日開催を追加するときは
 * トークンも足すこと。
 */
export interface EventDay {
  /** 連番（1始まり） */
  id: number;
  /** ISO 日付（例: "2026-08-29"）。開催済み判定に使う */
  date: string;
  /** 「8/29（土）」— フィルタ・ブースマップの見出し */
  label: string;
  /** 「8/29」— モバイルのフィルタ・カードのバッジ */
  short: string;
  /** 「8.29」— イベント情報の大きな日付 */
  display: string;
  /** 「SAT」— 大きな日付に添える英字 */
  weekday: string;
  /** 「8月29日（土）」— 詳細ダイアログのバッジ・フッター */
  long: string;
}

/** 会場。mapUrl があれば「マップで開く」ボタンを出す。 */
export interface Venue {
  name: string;
  /** 補足（「西原さわふじマルシェ」など）。空文字なら出さない */
  note: string;
  mapUrl: string | null;
}

/**
 * イベント情報の定義リストに出す1行。
 *
 * 「時間」と「場所」は hours / venue が専用に持ち、この配列には入れない
 * （行の順番がデータの並び順に左右されないよう、EventInfoSection が
 *  時間 → 場所 → details の順で組む）。
 */
export interface EventDetail {
  label: string;
  value: string;
  note: string;
}

export interface Faq {
  q: string;
  a: string;
}

/** フライヤー画像。PC（横長）とSP（縦）を <picture> で出し分ける。 */
export interface EventFlyer {
  /** images/<imageDir>/ 配下のファイル名 */
  pc: string;
  sp: string;
  alt: string;
  /** CLS防止のアスペクト比（Tailwind の任意値に入る形式: "1054/1492"） */
  aspectSp: string;
  aspectPc: string;
}

/** ブース配置図。1区画 = Instagramハンドル（""は空き、"a+b"は相席）。 */
export interface BoothBlock {
  /** 2列で並べる。1行 = [左, 右]。1行に1つだけ書くと全幅になる */
  rows: string[][];
}

/** 1日ぶんの区画配置。日程名は EventDay 側が持つので label は持たない。 */
export interface DayLayout {
  /** EventDay.id と対応 */
  id: number;
  /** テント内のブース。上から順に並ぶ */
  tentBlocks: BoothBlock[];
  /** 駐車場エリアのテント内ブース。左から横に並ぶ */
  parkingBlocks: BoothBlock[];
  /** キッチンカーエリア（横一列） */
  kitchenCarRow: string[];
  /** 駐車場テント右端の縦帯。不要なら null */
  kitchenCarSide: string | null;
}

/** 設備・建物などブース以外の区画。size は縦方向の比率。日程共通。 */
export interface Facility {
  label: string;
  size: number;
  tone: "plain" | "cream" | "dark";
  /** 補足ラベル（「従業員通路」など） */
  note?: string;
}

export interface BoothMapData {
  /** 図の一番上に出す帯（会場名） */
  venueLabel: string;
  /** テント列の下に出す目印。不要なら null */
  monumentLabel: string | null;
  dayLayouts: DayLayout[];
  leftFacilities: Facility[];
  rightFacilities: Facility[];
}

export interface EventData {
  /** URL になる識別子（例: "vol9" → /chinkisyokubutsuichiba/vol9/） */
  slug: string;
  /** 開催回（例: 9） */
  vol: number;
  /** イベント名（英字ロゴ。例: "BOTANI CARNIVAL"）。null なら「珍奇植物市場 Vol.N」だけ出す */
  name: string | null;
  /** ナビの2行ロゴ用（例: ["BOTANI", "CARNIVAL"]）。name が null なら空配列 */
  nameLines: string[];
  /** 「珍奇植物市場 Vol.9」 */
  subtitle: string;
  /** 開催年（大きな日付の上に出す）。未定なら null */
  year: number | null;
  /** 開催日。未定なら空配列 */
  days: EventDay[];
  /** 日程が未定のときに日付の代わりに出す文字（例: "開催日 調整中"） */
  dateTbd: string | null;
  /** 開催時間。null なら行を出さない */
  hours: { value: string; note: string } | null;
  venue: Venue | null;
  /** イベント情報の定義リストのうち、時間・場所以外の行（入場・グルメなど） */
  details: EventDetail[];
  /** リード文。heading は明朝の大きめ文、body は補足。null なら出さない */
  lead: { heading: string[]; body: string } | null;
  /** ページ上部に出すお知らせ（準備中の案内など）。null なら出さない */
  notice: string | null;
  flyer: EventFlyer | null;
  /** 一覧ページのカードに出すサムネイル（images/<imageDir>/ 配下）。null なら文字だけのタイル */
  thumbnail: string | null;
  /** 画像ディレクトリ（public/images/<imageDir>/） */
  imageDir: string;
  /** ナビ・フッターのイベントロゴ（images/<imageDir>/ 配下）。null ならロゴ画像なし */
  logo: string | null;
  /** イベント情報の下に出す写真バナー（images/<imageDir>/ 配下）。null なら出さない */
  photo: { file: string; alt: string; caption: string } | null;
  faqs: Faq[];
  exhibitors: Exhibitor[];
  boothMap: BoothMapData | null;
  /** 一覧ページのカードと meta description に使う1〜2文 */
  description: string;
}

/** 開催が終わったか。最終日の翌日0時を過ぎたら "past"。 */
export function eventStatus(event: EventData, now: Date = new Date()): "upcoming" | "past" {
  const last = event.days.at(-1);
  if (!last) return "upcoming";
  const end = new Date(`${last.date}T23:59:59+09:00`);
  return now.getTime() > end.getTime() ? "past" : "upcoming";
}
