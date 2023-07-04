import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Bar } from "../views/Bar";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  { path: "/start", component: Bar },
  {
    path: "/welcome",
    component: Welcome,
    children: [
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
];
