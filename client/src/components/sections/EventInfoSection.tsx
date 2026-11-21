/**
 * EventInfoSection — イベント詳細情報
 * Design: エディトリアル — タイポグラフィ主役のミニマル構成。
 * 大きな日付見出し + 定義リスト。装飾（バンティング・葉・色カード）は持たない。
 * SAT/SUN の色は出店業者一覧の日程フィルタと揃えている（index.css の --day-N）。
 *
 * 文言はすべて表示中の開催回（useEvent）から受け取る。
 * 行の順番は 時間 → 場所 → details（入場・グルメなど）で固定。
 */
import { MapPin } from "lucide-react";
import { asset } from "@/lib/asset";
import { useEvent } from "@/contexts/EventContext";
import { dayColor } from "@/lib/exhibitor";
import type { EventDetail } from "@/data/events/types";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const INK = "oklch(0.18 0.05 145)"; // 見出し・本文の濃緑
const MUTED = "oklch(0.50 0.05 145)"; // 補足テキスト
const LINE = "oklch(0.88 0.04 85)"; // 罫線

type Row = EventDetail & { mapUrl?: string | null };

export default function EventInfoSection() {
  const { event } = useEvent();

  // 定義リストの行。mapUrl があれば「マップで開く」ボタンを添える。
  const rows: Row[] = [
    ...(event.hours ? [{ label: "時間", value: event.hours.value, note: event.hours.note }] : []),
    ...(event.venue
      ? [
          {
            label: "場所",
            value: event.venue.name,
            note: event.venue.note,
            mapUrl: event.venue.mapUrl,
          },
        ]
      : []),
    ...event.details,
  ];

  return (
    <section
      id="event-info"
      className="py-20 px-4"
      style={{ backgroundColor: "oklch(0.96 0.03 85)" }}
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading overline="Event Info" title="イベント情報" />

        {/* Date — 大きなタイポグラフィ。日程未定なら dateTbd を出す。 */}
        <div className="mb-12 reveal">
          {event.year && (
            <p
              className="font-display text-sm font-bold tracking-[0.3em] mb-2"
              style={{ color: MUTED }}
            >
              {event.year}
            </p>
          )}
          {event.days.length > 0 ? (
            <p
              className="font-display font-extrabold leading-none tracking-tight tabular-nums"
              style={{ color: INK, fontSize: "clamp(2.75rem, 9vw, 5.5rem)" }}
            >
              {event.days.map((d, i) => (
                <span key={d.id}>
                  {/* 2日目以降は前の日付とダッシュでつなぐ */}
                  {i > 0 && (
                    <span className="mx-4" style={{ color: LINE }}>
                      —
                    </span>
                  )}
                  {d.display}
                  <span
                    className="text-[0.35em] font-bold align-middle ml-2"
                    style={{ color: dayColor(d.id) }}
                  >
                    {d.weekday}
                  </span>
                </span>
              ))}
            </p>
          ) : (
            event.dateTbd && (
              <p
                className="font-display font-extrabold leading-none tracking-tight"
                style={{ color: INK, fontSize: "clamp(1.75rem, 6vw, 3rem)" }}
              >
                {event.dateTbd}
              </p>
            )
          )}
        </div>

        {/* お知らせ（準備中の案内など）。決まったら notice を null にする。 */}
        {event.notice && (
          <div
            className="mb-12 rounded-2xl border px-5 py-4 text-sm leading-relaxed reveal"
            style={{ borderColor: LINE, backgroundColor: "oklch(0.99 0.01 85)", color: INK }}
          >
            {event.notice}
          </div>
        )}

        {/* Lead copy */}
        {event.lead && (
          <div className="mb-12 reveal">
            <p
              className="text-lg md:text-xl leading-relaxed mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
            >
              {event.lead.heading.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
            <p className="text-sm leading-relaxed max-w-prose" style={{ color: MUTED }}>
              {event.lead.body}
            </p>
          </div>
        )}

        {/* Details — 定義リスト */}
        {rows.length > 0 && (
          <dl className="reveal">
            {rows.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[5rem_1fr] items-baseline gap-4 py-4 border-t"
                style={{ borderColor: LINE }}
              >
                <dt className="text-xs font-bold tracking-widest" style={{ color: MUTED }}>
                  {d.label}
                </dt>
                <dd>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-base md:text-lg font-bold" style={{ color: INK }}>
                      {d.value}
                    </span>
                    {d.note && (
                      <span className="text-xs" style={{ color: MUTED }}>
                        {d.note}
                      </span>
                    )}
                  </div>
                  {d.mapUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-3 h-auto gap-1.5 rounded-full bg-transparent px-4 py-1.5 text-xs font-bold"
                      style={{ borderColor: dayColor(1), color: dayColor(1) }}
                    >
                      <a href={d.mapUrl} target="_blank" rel="noopener noreferrer">
                        <MapPin className="size-3.5" />
                        マップで開く
                      </a>
                    </Button>
                  )}
                </dd>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: LINE }} />
          </dl>
        )}

        {/* 写真バナー（キッチンカーなど）— 控えめに添える */}
        {event.photo && (
          <figure className="mt-12 reveal">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={asset(`images/${event.imageDir}/${event.photo.file}`)}
                alt={event.photo.alt}
                className="w-full aspect-[21/9] object-cover"
                loading="lazy"
              />
            </div>
            {event.photo.caption && (
              <figcaption className="mt-2 text-xs" style={{ color: MUTED }}>
                {event.photo.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-20 -mx-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "60px" }}>
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
