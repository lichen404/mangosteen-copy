import { Transition, VNode, defineComponent, ref, watchEffect } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import s from "./Welcome.module.scss";
import { useSwipe } from "../hooks/useSwipe";
import { throttle } from "../shared/throttle";

const pushMap: Record<string, string> = {
  welcome1: "/welcome/2",
  welcome2: "/welcome/3",
  welcome3: "/welcome/4",
  welcome4: "/start",
};

export const Welcome = defineComponent({
  setup: () => {
    const main = ref<HTMLElement | null>(null);
    const { direction, swiping } = useSwipe(main, {
      beforeStart: (e) => e.preventDefault(),
    });
    const route = useRoute();
    const router = useRouter();

    const replace = throttle(() => {
      const name = (route.name || "welcome1").toString();
      router.replace(pushMap[name]);
    }, 500);

    watchEffect(() => {
      if (swiping.value && direction.value === "left") {
        replace();
      }
    });
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#mangosteen" />
          </svg>
          <h1>山竹记账</h1>
        </header>
        <main class={s.main} ref={main}>
          <RouterView name="main">
            {({ Component }: { Component: VNode }) => {
              return (
                <Transition
                  enterFromClass={s.slide_fade_enter_from}
                  enterActiveClass={s.slide_fade_enter_active}
                  leaveToClass={s.slide_fade_leave_to}
                  leaveActiveClass={s.slide_fade_leave_active}
                >
                  {Component}
                </Transition>
              );
            }}
          </RouterView>
        </main>
        <footer>
          <RouterView name="footer"></RouterView>
        </footer>
      </div>
    );
  },
});
