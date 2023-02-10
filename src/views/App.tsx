import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import s from "./App.module.scss";

export const App = defineComponent({
  setup() {
    return () => (
      <div class={s.wrapper}>
        <header>导航</header>
        <ul>
          <li>
            <RouterLink to="/about">Bar</RouterLink>
          </li>
          <li>
            <RouterLink to="/">Foo</RouterLink>
          </li>
        </ul>
        <RouterView />
        <footer>页脚</footer>
      </div>
    );
  },
});
