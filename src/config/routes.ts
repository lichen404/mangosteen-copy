import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/start", component: Bar },
  {
    path: "/welcome",
    component: Welcome,
    children: [
      { path: "1", component: First, name: "welcome1" },
      { path: "2", component: Second, name: "welcome2" },
      { path: "3", component: Third, name: "welcome3" },
      { path: "4", component: Forth, name: "welcome4" },
    ],
  },
];
