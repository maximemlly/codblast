import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "game.html"),
        about: resolve(__dirname, "about.html"),
        stats: resolve(__dirname, "stats.html"),
      },
    },
  },
});
