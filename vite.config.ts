import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  base:"",
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
        target:"http://123.57.27.189:3000"
      }
    }
  }
});
