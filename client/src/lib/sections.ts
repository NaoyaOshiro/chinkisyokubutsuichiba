/**
 * その開催回で実際に出すセクションの一覧。
 *
 * ナビの項目・GA4の計測対象・ページの描画をこの1か所から決める。
 * データが未確定の回（出店者やブースマップがまだ無い）では、該当セクションを
 * 丸ごと出さない。
 */
import type { EventData } from "@/data/events/types";

export interface SectionDef {
  /** <section> の id。ナビのアンカーにもなる */
  id: string;
  /** ナビ・GA4 の表示名 */
  name: string;
}

export function visibleSections(event: EventData): SectionDef[] {
  const sections: SectionDef[] = [];
  if (event.flyer) sections.push({ id: "hero", name: "トップ" });
  sections.push({ id: "event-info", name: "イベント情報" });
  if (event.boothMap) sections.push({ id: "booth-map", name: "ブースマップ" });
  if (event.exhibitors.length > 0) sections.push({ id: "exhibitors", name: "出店紹介" });
  if (event.faqs.length > 0) sections.push({ id: "faq", name: "よくある質問" });
  sections.push({ id: "contact", name: "お問い合わせ" });
  return sections;
}
