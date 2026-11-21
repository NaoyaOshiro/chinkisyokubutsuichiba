/**
 * HeroSection — フライヤー画像のみ表示（レスポンシブ切り替え）
 * PC (md以上): 横長フライヤー / SP (md未満): 縦フライヤー
 *
 * 切り替えは <picture> + <source media> で行う。
 * CSS（hidden md:block）で出し分けると display:none 側もダウンロードされ、
 * PC・SP 両方のフライヤーを取りに行ってしまうため。
 *
 * フライヤーが未入稿の回では EventPage 側でこのセクションを出さない。
 *
 * Design: Tropical Fiesta
 */
import type { CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { useEvent } from "@/contexts/EventContext";

export default function HeroSection() {
  const { event } = useEvent();
  const flyer = event.flyer;
  if (!flyer) return null;

  // ページ内で唯一の h1。イベント名・日程・会場を1文にまとめる。
  const heading = [
    event.name,
    event.subtitle,
    event.days.length > 0 ? `${event.year}年${event.days.map((d) => d.long).join("・")}` : event.dateTbd,
    event.venue?.name,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-start overflow-hidden pt-16"
      style={{ backgroundColor: "oklch(0.18 0.05 145)" }}
    >
      {/*
        イベント名がドキュメント構造上どこにも存在しない状態だったため、
        視覚的には隠して見出しだけ与える。
      */}
      <h1 className="sr-only">{heading}</h1>

      <picture className="block w-full">
        <source
          media="(min-width: 768px)"
          srcSet={asset(`images/${event.imageDir}/${flyer.pc}`)}
        />
        <img
          src={asset(`images/${event.imageDir}/${flyer.sp}`)}
          alt={flyer.alt}
          /* LCP要素。遅延させず優先的に取りに行かせる */
          fetchPriority="high"
          decoding="async"
          /*
            aspect比を先に確保して読み込み時のガタつき（CLS）を防ぐ。
            SPとPCで元画像の比率が違うので、ブレークポイントで切り替える。
            比率は回ごとにデータで変わるため、Tailwind の任意値ではなく
            CSS変数 + .flyer-image（index.css）で出し分ける
            （Tailwind はソースを静的に読むので実行時の値ではクラスを作れない）。
          */
          className="flyer-image block w-full object-cover"
          style={
            {
              "--flyer-aspect-sp": flyer.aspectSp,
              "--flyer-aspect-pc": flyer.aspectPc,
            } as CSSProperties
          }
        />
      </picture>

      {/* Wave divider */}
      <div className="w-full -mb-1">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,60 L0,60 Z" fill="oklch(0.96 0.03 85)" />
        </svg>
      </div>
    </section>
  );
}
