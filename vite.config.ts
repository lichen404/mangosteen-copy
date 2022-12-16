import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mangosteen-copy/dist/",
  plugins: [vue(), vueJsx({ mergeProps: true, transformOn: true })],
});
