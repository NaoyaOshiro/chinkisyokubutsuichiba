/**
 * 404。開催回の slug が見つからないとき、または存在しないパスに来たとき。
 * 行き先は1つ（開催一覧）に絞る。
 */
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "var(--jungle-dark)", fontFamily: "'Noto Sans JP', sans-serif" }}
    >
      <AlertCircle className="size-12" style={{ color: "var(--gold-accent)" }} />
      <p className="font-display mt-6 text-5xl font-extrabold text-white">404</p>
      <h1
        className="mt-4 text-lg font-bold text-white"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        ページが見つかりませんでした
      </h1>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/60">
        URLが変わっているか、削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--carnival-green)" }}
      >
        {site.name} の開催一覧へ
      </Link>
    </div>
  );
}
