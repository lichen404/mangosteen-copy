import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { Forth } from "../components/welcome/Forth";
import { Second } from "../components/welcome/Second";
import { Third } from "../components/welcome/Third";
import { Foo } from "../views/Foo";
import { Welcome } from "../views/Welcome";
import { FirstActions } from "../components/welcome/FirstActions";
import { SecondActions } from "../components/welcome/SecondActions";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { ForthActions } from "../components/welcome/ForthActions";
import { ItemPage } from "../views/ItemPage";
import { ItemCreate } from "../components/Item/ItemCreate";
import { http } from "../shared/Http";
import { ItemList } from "../components/Item/ItemList";
import { TagPage } from "../views/TagPage";
import { TagCreate } from "../components/Tag/TagCreate";
import { TagEdit } from "../components/Tag/TagEdit";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { ComingSoon } from "../shared/ComingSoon";

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Foo },
  {
    path: "/items",
    component: ItemPage,
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
    component: Welcome,
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
    component: TagPage,
    children: [
      {
        path: "create",
        component: TagCreate,
      },
      {
        path: ":id/edit",
        component: TagEdit,
      },
    ],
  },
  {
    path: "/sign_in",
    component: SignInPage,
  },
  {
    path: "/statistics",
    component: StatisticsPage,
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
