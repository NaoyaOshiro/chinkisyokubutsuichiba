/**
 * ルート（/）— 珍奇植物市場の開催一覧。
 *
 * 開催回を新しい順に並べ、それぞれの特設ページ（/vol9, /vol10, …）へ送る。
 * 回の追加は client/src/data/events/index.ts の events 配列に足すだけで反映される。
 *
 * Design: 特設ページと同じパレット（ジャングルダーク + サンドベース）で、
 * 装飾は持たずカードの一覧に徹する。
 */
import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { Link } from "wouter";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";
import { events } from "@/data/events";
import { eventStatus, type EventData } from "@/data/events/types";
import { useDocumentMeta } from "@/lib/meta";

const INK = "oklch(0.18 0.05 145)";
const MUTED = "oklch(0.50 0.05 145)";
const LINE = "oklch(0.88 0.04 85)";

/** カードの日程行。「2026年8月29日（土）・30日（日）」。未定なら dateTbd。 */
function dateLine(event: EventData): string | null {
  if (event.days.length === 0) return event.dateTbd;
  const year = event.year ? `${event.year}年` : "";
  return `${year}${event.days.map((d) => d.long).join("・")}`;
}

function StatusBadge({ event }: { event: EventData }) {
  const upcoming = eventStatus(event) === "upcoming";
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wider"
      style={
        upcoming
          ? { backgroundColor: "var(--carnival-green)", color: "white" }
          : { backgroundColor: "oklch(0.91 0.03 85)", color: MUTED }
      }
    >
      {upcoming ? "開催予定" : "開催終了"}
    </span>
  );
}

function EventCard({ event }: { event: EventData }) {
  const date = dateLine(event);

  return (
    <Link
      href={`/${event.slug}`}
      className="group grid grid-cols-[6.5rem_1fr] items-stretch gap-4 border-t py-6 sm:grid-cols-[9rem_1fr] sm:gap-6"
      style={{ borderColor: LINE }}
    >
      {/* サムネイル（フライヤーの縦版）。未入稿の回は Vol.N のタイルを出す。 */}
      <div
        className="overflow-hidden rounded-xl"
        style={{ backgroundColor: "oklch(0.91 0.03 85)" }}
      >
        {event.thumbnail ? (
          <img
            src={asset(`images/${event.imageDir}/${event.thumbnail}`)}
            alt={`${event.subtitle} フライヤー`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex aspect-[3/4] items-center justify-center font-display text-2xl font-extrabold"
            style={{ color: "oklch(0.75 0.03 85)" }}
          >
            {event.vol}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="font-display text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: "var(--carnival-green)" }}
          >
            Vol.{event.vol}
          </span>
          <StatusBadge event={event} />
        </div>

        {/* イベント名があれば主役はそちら。未定の回は副題を大きく出す。 */}
        <h2
          className="text-xl font-bold leading-tight sm:text-2xl"
          style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
        >
          {event.name ?? event.subtitle}
        </h2>
        {event.name && (
          <p className="mt-1 text-xs" style={{ color: MUTED }}>
            {event.subtitle}
          </p>
        )}

        <dl className="mt-3 space-y-1 text-xs" style={{ color: MUTED }}>
          {date && (
            <div className="flex gap-2">
              <dt className="sr-only">日程</dt>
              <dd className="font-bold" style={{ color: INK }}>
                {date}
              </dd>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">会場</dt>
              <dd className="flex items-center gap-1">
                <MapPin className="size-3" />
                {event.venue.name}
              </dd>
            </div>
          )}
        </dl>

        <span
          className="mt-auto flex items-center gap-1 pt-3 text-xs font-bold transition-colors group-hover:text-[var(--carnival-green)]"
          style={{ color: INK }}
        >
          特設ページをみる
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Top() {
  useDocumentMeta({ title: `${site.name} | 開催一覧`, description: site.description });

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* ヘッダー帯。特設ページのナビと同じジャングルダーク。 */}
      <header className="px-4 py-16 sm:py-20" style={{ backgroundColor: "var(--jungle-dark)" }}>
        <div className="mx-auto max-w-3xl">
          <p
            className="font-display mb-3 text-xs font-bold tracking-[0.35em] uppercase"
            style={{ color: "var(--gold-accent)" }}
          >
            {site.nameEn}
          </p>
          <h1
            className="text-3xl font-bold leading-tight text-white sm:text-4xl"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            {site.name}
          </h1>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/60">{site.tagline}</p>
        </div>
      </header>

      {/* 開催回の一覧 */}
      <main className="px-4 py-16" style={{ backgroundColor: "var(--sand-base)" }}>
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-display mb-8 text-xs font-bold tracking-[0.35em] uppercase"
            style={{ color: "var(--carnival-green)" }}
          >
            Events
          </h2>
          <div>
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
            <div className="border-t" style={{ borderColor: LINE }} />
          </div>
        </div>
      </main>

      {/* フッター。問い合わせ導線と制作クレジット。 */}
      <footer
        className="px-4 py-12 text-center"
        style={{ backgroundColor: "var(--jungle-dark)", color: "oklch(0.80 0.05 85)" }}
      >
        <div className="mx-auto max-w-3xl">
          <a
            href={`https://www.instagram.com/${site.organizerInstagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <Instagram className="size-4" />@{site.organizerInstagram}
          </a>
          <p className="mt-8 text-xs opacity-40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-display mt-3 text-sm tracking-[0.08em] opacity-80">
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
      </footer>
    </div>
  );
}
