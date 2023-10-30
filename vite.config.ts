import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ mergeProps: true, transformOn: true }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  server:{
    proxy:{
      '/api/v1':{
        target:"http://101.200.36.15:3000"
      }
    }
  }
});
