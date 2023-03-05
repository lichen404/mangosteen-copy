import { createApp } from "vue";

import { App } from "./App";
import { routes } from "./config/routes";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
