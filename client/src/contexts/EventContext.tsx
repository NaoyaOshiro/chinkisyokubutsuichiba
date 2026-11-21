/**
 * 表示中の開催回（EventData）を各セクションに渡すコンテキスト。
 *
 * 1つのSPAで /vol9 /vol10 … を扱うため、セクションはデータを直接 import せず
 * ここから受け取る。ハンドル→出店業者の索引もここで1回だけ作る
 * （ブースマップが区画ごとに引くので、毎回 find すると数十回の走査になる）。
 */
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { EventData, Exhibitor } from "@/data/events/types";

interface EventContextValue {
  event: EventData;
  /** Instagramハンドルから出店業者を引く。データに無ければ null。 */
  findByHandle: (handle: string) => Exhibitor | null;
}

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({
  event,
  children,
}: {
  event: EventData;
  children: ReactNode;
}) {
  const value = useMemo<EventContextValue>(() => {
    const byHandle = new Map(
      event.exhibitors.filter((e) => e.instagram).map((e) => [e.instagram as string, e])
    );
    return { event, findByHandle: (handle) => byHandle.get(handle) ?? null };
  }, [event]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvent(): EventContextValue {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent() は EventProvider の内側で使ってください。");
  return ctx;
}
