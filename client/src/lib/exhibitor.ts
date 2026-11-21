/**
 * 出店業者データの共通ヘルパー。
 * 出店紹介（一覧カード）とブースマップの両方から使う。
 *
 * 画像は開催回ごとのディレクトリ（images/<imageDir>/exhibitors/<slug>/）に
 * 入るため、パスを作る関数は imageDir を受け取る。呼び出し側は
 * useEvent() の event.imageDir を渡す。
 */
import { asset } from "@/lib/asset";
import type { EventDay, Exhibitor } from "@/data/events/types";

/** 画像未設定時のプレースホルダー（正方形）。開催回に依らない共通画像。 */
export const noImage = asset("images/site/no_image_square.jpg");

/** 商品画像のURL配列。未設定なら no_image を1枚返す。 */
export function productImages(e: Exhibitor, imageDir: string): string[] {
  if (e.slug && e.images.length > 0) {
    return e.images.map((f) => asset(`images/${imageDir}/exhibitors/${e.slug}/${f}`));
  }
  return [noImage];
}

/** アイコン画像のURL。未設定なら null。 */
export function iconSrc(e: Exhibitor, imageDir: string): string | null {
  if (e.slug && e.icon) return asset(`images/${imageDir}/exhibitors/${e.slug}/${e.icon}`);
  return null;
}

/** InstagramのURL。ハンドルが無ければ null（リンク非表示）。 */
export function instagramUrl(e: Exhibitor): string | null {
  return e.instagram ? `https://www.instagram.com/${e.instagram}/` : null;
}

/**
 * 日程ごとの色。実体は index.css の日程カラートークン（--day-1 / --day-2）。
 * 各セクションで色がずれないよう、日程IDから引く形に一元化している。
 */
export function dayColor(id: number): string {
  return `var(--day-${id})`;
}

/** 全日程に出る業者の色。 */
export const BOTH_COLOR = "var(--day-both)";

/** その業者が出る日程だけを、開催日の並び順で返す。 */
export function attendingDays(e: Exhibitor, days: EventDay[]): EventDay[] {
  return days.filter((d) => e.days.includes(d.id));
}

/** カードに出す日程バッジ。全日 / 一部の日 で色分けする。 */
export function dayBadge(e: Exhibitor, days: EventDay[]): { text: string; color: string } {
  const attending = attendingDays(e, days);
  // 開催日が複数あって全日出るなら「両日」。1日開催なら日付をそのまま出す。
  if (days.length > 1 && attending.length === days.length) {
    return { text: days.length === 2 ? "両日" : "全日", color: BOTH_COLOR };
  }
  const first = attending[0];
  if (!first) return { text: "", color: BOTH_COLOR };
  return { text: first.short, color: dayColor(first.id) };
}
