import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    define:command === 'build' ? {
      DEBUG:false
    }:{
      DEBUG:true
    },
    plugins: [
      vue(),
      vueJsx({ mergeProps: true, transformOn: true }),
      svgstore(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    server: {
      proxy: {
        "/api/v1": {
          target: "http://123.57.27.189:3000",
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("echarts")) {
              return "echarts";
            }
            if (id.includes("mock") || id.includes("faker")) {
              return "mock";
            }
            if (id.includes("vant")) {
              return "vant";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
