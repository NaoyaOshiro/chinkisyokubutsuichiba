/**
 * Footer — 開催回ごとのフッター
 * Design: Tropical Fiesta — ジャングルダーク背景
 *
 * イベント名・日程・会場は表示中の開催回から、制作クレジットはサイト共通設定から。
 */
import { Link } from "wouter";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";
import { useEvent } from "@/contexts/EventContext";

export default function Footer() {
  const { event } = useEvent();
  // 「2026年8月29日（土）・30日（日）11:00〜16:00」。未定なら dateTbd だけ。
  const dateLine =
    event.days.length > 0
      ? [
          `${event.year ? `${event.year}年` : ""}${event.days.map((d) => d.long).join("・")}`,
          event.hours?.value,
        ]
          .filter(Boolean)
          .join(" ")
      : event.dateTbd;
  const copyrightYear = event.year ?? new Date().getFullYear();
  const copyrightName = event.name ? `${event.name} / ${event.subtitle}` : event.subtitle;

  return (
    <footer
      className="py-12 px-4 text-center"
      style={{ backgroundColor: "oklch(0.18 0.05 145)", color: "oklch(0.80 0.05 85)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          {event.logo && (
            <img
              src={asset(`images/${event.imageDir}/${event.logo}`)}
              alt={event.name ?? event.subtitle}
              width={144}
              height={144}
              loading="lazy"
              /* 元画像は透過なし。濃緑背景で四隅の白が出るため円形にクリップする */
              className="w-12 h-12 object-contain rounded-full opacity-90"
            />
          )}
          <div className="text-left">
            <div className="font-display font-bold text-xl tracking-[0.12em] text-white">
              {event.name ?? site.name}
            </div>
            <div className="text-xs opacity-70">{event.subtitle}</div>
          </div>
        </div>
        {dateLine && <p className="text-sm opacity-60 mb-2">{dateLine}</p>}
        {event.venue && <p className="text-sm opacity-60 mb-6">{event.venue.name}</p>}

        {/* 開催回の一覧（ルート）へ戻る導線。ページ下まで読んだ人の次の行き先。 */}
        <Link
          href="/"
          className="inline-block rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          {site.name} の開催一覧をみる
        </Link>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs opacity-40">
            © {copyrightYear} {copyrightName}. All rights reserved.
          </p>
          {/* 制作クレジット。屋号はおーしろ製作所のInstagramへ。
              最下部の定位置のまま、屋号をゴールドで少し目立たせる。 */}
          <p className="font-display text-sm tracking-[0.08em] opacity-80 mt-3">
            Site by{" "}
            <a
              href={`https://www.instagram.com/${site.credit.instagram}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              {site.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
