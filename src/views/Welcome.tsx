import { FunctionalComponent, Transition, VNode } from "vue";
import { RouterView } from "vue-router";
import s from "./Welcome.module.scss";

export const Welcome: FunctionalComponent = () => (
  <div class={s.wrapper}>
    <header>
      <svg>
        <use xlinkHref="#mangosteen" />
      </svg>
      <h1>山竹记账</h1>
    </header>
    <main class={s.main}>
      <RouterView>
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
  </div>
);

Welcome.displayName = "Welcome";
