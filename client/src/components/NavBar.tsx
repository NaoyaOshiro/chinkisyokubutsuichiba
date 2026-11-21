/**
 * NavBar — 常時濃緑のスティッキーナビ
 * 項目はそのイベントに存在するセクションだけ（visibleSections）。
 * ロゴ・イベント名は表示中の開催回から、一覧への戻り導線はサイト共通。
 * Design: Tropical Fiesta
 */
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";
import { useEvent } from "@/contexts/EventContext";
import { visibleSections } from "@/lib/sections";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBar() {
  const { event } = useEvent();
  // トップ（フライヤー）はナビに出さない。ロゴのクリックがその役目を持つ。
  const navItems = visibleSections(event).filter((s) => s.id !== "hero");
  // ロゴの行。イベント名が未定の回は「珍奇植物市場 Vol.N」を1行で出す。
  const logoLines = event.nameLines.length > 0 ? event.nameLines : [event.subtitle];

  return (
    <header
      /*
        背景はブースマップ・お問い合わせと同じジャングルダーク。最上部でも
        透明にはせず常に敷くので、文字とアイコンは白で通せる。
      */
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--jungle-dark)]/95 backdrop-blur-md shadow-md"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          {/*
            イベントアイコン（円形バッジ）。元画像は透過を持たない正方形で、
            四隅の白がヘッダー・フッターの濃緑上で出てしまうため
            rounded-full で円形にクリップする。
          */}
          {event.logo && (
            <img
              src={asset(`images/${event.imageDir}/${event.logo}`)}
              alt={event.name ?? event.subtitle}
              width={144}
              height={144}
              className="w-10 h-10 object-contain rounded-full"
            />
          )}
          <div className="leading-tight text-white">
            {logoLines.map((line) => (
              <div key={line} className="font-display font-bold text-sm tracking-[0.15em]">
                {line}
              </div>
            ))}
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-medium text-white transition-colors duration-200 hover:text-[oklch(0.72_0.18_55)]"
            >
              {item.name}
            </a>
          ))}
          {/* 開催回の一覧（ルート）へ戻る */}
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-[oklch(0.80_0.16_85)]"
          >
            <ChevronLeft className="size-4" />
            開催一覧
          </Link>
        </nav>

        {/* Mobile hamburger（shadcn/ui Sheet） */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 text-white"
              aria-label="メニューを開く"
            >
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
              <div className="w-6 h-0.5 bg-current transition-all" />
            </button>
          </SheetTrigger>
          {/*
            text-white はここで指定する。shadcn の閉じるボタン(X)は
            currentColor を継承するので、濃背景では白にしないと見えなくなる。
          */}
          <SheetContent
            side="right"
            className="w-64 bg-[var(--jungle-dark)] text-white border-white/15"
          >
            <SheetHeader>
              <SheetTitle className="font-display font-bold tracking-[0.2em] text-white">
                MENU
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col px-2">
              {navItems.map((item) => (
                <SheetClose asChild key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white hover:bg-white/10 hover:text-[oklch(0.72_0.18_55)] transition-colors"
                  >
                    {item.name}
                  </a>
                </SheetClose>
              ))}
              <div className="my-2 border-t border-white/15" />
              <SheetClose asChild>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-[oklch(0.80_0.16_85)] transition-colors"
                >
                  <ChevronLeft className="size-4" />
                  {site.name} 開催一覧
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
