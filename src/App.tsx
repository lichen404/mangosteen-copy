import { defineComponent, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

export const App = defineComponent({
  setup() {
    return () => (
      <>
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
      </>
    );
  },
});
