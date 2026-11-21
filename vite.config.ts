import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];

/**
 * ページごとの HTML エントリ。
 *
 * 1つのSPA（同じバンドル）を共有しつつ、開催回ごとに HTML を分けている。
 * シェア時のOGP（タイトル・説明・フライヤー画像）はクローラが読むため、
 * SPA内で書き換えるのでは間に合わず、静的に持たせる必要がある。
 *
 * 新しい回を追加するときは client/vol11/index.html を作ってここに1行足す。
 */
const pages = {
  main: "client/index.html",
  vol9: "client/vol9/index.html",
  vol10: "client/vol10/index.html",
};

export default defineConfig(({ command }) => ({
  // GitHub Pages のプロジェクトページはサブパス配信（例: /chinkisyokubutsuichiba/）。
  // 本番ビルド時のみ base を付与し、ローカル開発（vite dev）はルート直下にする。
  // 独自ドメインや別ホストに移す場合は VITE_BASE_PATH で上書き可能。
  // 変更するときは client/**/index.html の canonical・og:url・og:image と
  // client/src/data/site.ts の url も揃えること。
  base: command === "build" ? process.env.VITE_BASE_PATH ?? "/chinkisyokubutsuichiba/" : "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      // root(client) からの相対位置がそのまま出力パスになる
      // （client/vol9/index.html → dist/public/vol9/index.html）
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [
          name,
          path.resolve(import.meta.dirname, file),
        ])
      ),
    },
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
