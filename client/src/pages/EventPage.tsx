/**
 * 開催回ごとの特設ページ（/vol9, /vol10, …）。
 *
 * 文言・画像・出店者はすべて EventData が持ち、EventProvider 経由で各セクションに渡す。
 * データが未確定のセクション（フライヤー・ブースマップ・出店者・FAQ）は
 * それぞれのコンポーネントが null を返して出ない。
 *
 * Design: Tropical Fiesta — メキシカン・フィエスタ × トロピカル・ジャングル × ヴィンテージ・フェスティバル
 * Colors: Carnival Green, Fiesta Orange, Magenta Bloom, Gold Accent, Jungle Dark, Sand Base
 * Fonts: Montserrat (英字ディスプレイ: ロゴ・Overline・日付), Noto Serif JP (見出し明朝), Noto Sans JP (本文)
 */
import { useEffect } from "react";
import type { EventData } from "@/data/events/types";
import { EventProvider } from "@/contexts/EventContext";
import { trackSectionView } from "@/lib/analytics";
import { eventTitle, useDocumentMeta } from "@/lib/meta";
import { visibleSections } from "@/lib/sections";
import HeroSection from "@/components/sections/HeroSection";
import EventInfoSection from "@/components/sections/EventInfoSection";
import BoothMapSection from "@/components/sections/BoothMapSection";
import ExhibitorsSection from "@/components/sections/ExhibitorsSection";
// 協賛セクションは一時的に非表示。復活させるときはこの import と
// JSX・visibleSections のコメントアウトを戻す。
// import SponsorsSection from "@/components/sections/SponsorsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function EventPage({ event }: { event: EventData }) {
  useDocumentMeta({ title: eventTitle(event), description: event.description });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [event]);

  // セクション閲覧の計測（GA4 の view_section）。各セクションが初めて画面に
  // 入ったら1回だけ送り、以降は監視を外す（スクロールで行き来しても二重計上しない）。
  useEffect(() => {
    const sections = visibleSections(event);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const section = sections.find((s) => s.id === el.id);
          if (section) trackSectionView(section);
          observer.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [event]);

  return (
    <EventProvider event={event}>
      <div className="min-h-screen" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        <NavBar />
        <HeroSection />
        <EventInfoSection />
        <BoothMapSection />
        <ExhibitorsSection />
        {/* <SponsorsSection /> 協賛セクション非表示中 */}
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </EventProvider>
  );
}
