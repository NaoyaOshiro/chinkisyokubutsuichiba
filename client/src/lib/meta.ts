/**
 * ページごとの <title> と meta description。
 *
 * 初回表示ぶんは各 HTML（client/index.html, client/vol9/index.html, …）が
 * 静的に持っている（SNSのシェア時にクローラが読むのはこちら）。
 * ここで更新するのは、SPA内でページを移動したときのための補いである。
 */
import { useEffect } from "react";
import type { EventData } from "@/data/events/types";

/** 「BOTANI CARNIVAL | 珍奇植物市場 Vol.9」。イベント名が未定なら副題だけ。 */
export function eventTitle(event: EventData): string {
  return event.name ? `${event.name} | ${event.subtitle}` : event.subtitle;
}

export function useDocumentMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}): void {
  useEffect(() => {
    document.title = title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", description);
  }, [title, description]);
}
