import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { events } from "@/data/events";
import EventPage from "@/pages/EventPage";
import NotFound from "@/pages/NotFound";
import Top from "@/pages/Top";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// GitHub Pages のサブパス配信（例: /chinkisyokubutsuichiba/）でもルーティングが
// 機能するよう、Vite の base をルーターの base に渡す。
// ローカル開発では "" になりルート直下で動く。
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * 末尾スラッシュを落とすロケーションフック。
 *
 * 開催回ごとに実ファイル（/vol9/index.html）を書き出しているため、ブラウザの
 * パスは "/vol9/" になる。wouter のパターンは完全一致なので、そのままだと
 * "/vol9" のルートに当たらず404になる。
 */
const useNormalizedLocation: typeof useBrowserLocation = (options) => {
  const [location, navigate] = useBrowserLocation(options);
  const normalized = location.length > 1 ? location.replace(/\/+$/, "") || "/" : location;
  return [normalized, navigate];
};

function Router() {
  return (
    <WouterRouter base={routerBase} hook={useNormalizedLocation}>
      <Switch>
        {/* ルート: 開催一覧 */}
        <Route path="/" component={Top} />
        {/* 開催回ごとの特設ページ。events 配列に足すと自動で増える。 */}
        {events.map((event) => (
          <Route key={event.slug} path={`/${event.slug}`}>
            <EventPage event={event} />
          </Route>
        ))}
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
