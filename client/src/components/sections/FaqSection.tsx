/**
 * FaqSection — よくある質問
 * Design: エディトリアル — 罫線区切りのアコーディオン（イベント情報の定義リストと同じ文法）。
 * 白カード・Q/Aの丸バッジ・影は持たない。質問文自体が見出しとして機能する。
 *
 * 質問は開催回ごとのデータ（EventData.faqs）から。空なら EventPage 側で出さない。
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEvent } from "@/contexts/EventContext";
import SectionHeading from "@/components/SectionHeading";

// 背景がジャングルダークなので、文字と罫線は白系に反転する。
const INK = "#fff";
const MUTED = "rgba(255,255,255,0.65)";
const LINE = "rgba(255,255,255,0.15)";

export default function FaqSection() {
  const { event } = useEvent();
  if (event.faqs.length === 0) return null;

  return (
    <section id="faq" className="py-24 px-4" style={{ backgroundColor: "oklch(0.18 0.05 145)" }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading overline="FAQ" title="よくある質問" tone="dark" />

        <Accordion type="single" collapsible className="reveal">
          {event.faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`q${i}`}
              className="border-b-0 border-t"
              style={{ borderColor: LINE }}
            >
              <AccordionTrigger
                className="gap-4 py-5 text-left text-base font-bold hover:no-underline [&>svg]:size-5"
                style={{ fontFamily: "'Noto Serif JP', serif", color: INK }}
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed" style={{ color: MUTED }}>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* 最終行の下辺。イベント情報のリストと同じ閉じ方に揃える。 */}
          <div className="border-t" style={{ borderColor: LINE }} />
        </Accordion>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 -mb-24 -mx-4">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "60px" }}
          aria-hidden="true"
        >
          <path d="M0,20 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.18 0.05 145)" />
        </svg>
      </div>
    </section>
  );
}
