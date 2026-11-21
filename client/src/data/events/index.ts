/**
 * 開催回の一覧。
 *
 * 【新しい回を追加する手順】
 * 1. client/src/data/events/vol11/index.ts を作り、EventData を1つ export する
 *    （vol10/index.ts を雛形にするとよい）
 * 2. 画像を client/public/images/vol11/ に置く
 * 3. このファイルの events 配列の先頭に足す（新しい回が先）
 * 4. client/vol11/index.html を作る（vol10/index.html をコピーして meta を直す）
 * 5. vite.config.ts の rollupOptions.input に vol11 を足す
 */
import type { EventData } from "@/data/events/types";
import { vol10 } from "./vol10";
import { vol9 } from "./vol9";

/** 新しい回が先頭。ルートの一覧ページはこの順で並べる。 */
export const events: EventData[] = [vol10, vol9];

/** URL の slug から開催回を引く。無ければ null（404へ）。 */
export function findEvent(slug: string): EventData | null {
  return events.find((e) => e.slug === slug) ?? null;
}
