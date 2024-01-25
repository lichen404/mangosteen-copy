import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";

import { ItemCreate } from "../components/Item/ItemCreate";

import { ItemList } from "../components/Item/ItemList";

import { ComingSoon } from "../shared/ComingSoon";

export const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/welcome" },
  {
    path: "/items",
    component: () => import("../views/ItemPage"),
    children: [
      {
        path: "",
        component: ItemList,
      },
      {
        path: "create",
        component: ItemCreate,
      },
    ],
  },
  {
    path: "/welcome",
    component: () => import("../views/Welcome"),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("skipFeatures") === "yes" ? next("/items") : next();
    },
    children: [
      {
        path: "",
        redirect: "/welcome/1",
      },
      {
        path: "1",
        components: { main: First, footer: FirstActions },
        name: "welcome1",
      },
      {
        path: "2",
        components: { main: Second, footer: SecondActions },
        name: "welcome2",
      },
      {
        path: "3",
        components: { main: Third, footer: ThirdActions },
        name: "welcome3",
      },
      {
        path: "4",
        components: { main: Forth, footer: ForthActions },
        name: "welcome4",
      },
    ],
  },
  {
    path: "/tags",
    component: () => import("../views/TagPage"),
    children: [
      {
        path: "create",
        component: () => import("../components/Tag/TagCreate"),
      },
      {
        path: ":id/edit",
        component: () => import("../components/Tag/TagEdit"),
      },
    ],
  },
  {
    path: "/sign_in",
    component: () => import("../views/SignInPage"),
  },
  {
    path: "/statistics",
    component: () => import("../views/StatisticsPage"),
  },
  {
    path: "/export",
    component: ComingSoon,
  },
  {
    path: "/notify",
    component: ComingSoon,
  },
];
