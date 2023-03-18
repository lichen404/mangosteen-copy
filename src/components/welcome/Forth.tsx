import s from "./WelcomeLayout.module.scss";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";
import cloud from "../../assets/icons/pig.svg";

export const Forth = () => (
  <WelcomeLayout>
    {{
      icon: () => <img src={cloud} />,
      title: () => (
        <h2>
          云备份
          <br />
          再也不怕数据丢失
        </h2>
      ),
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/start">完成</RouterLink>
          <RouterLink to="/start" class={s.fake}>
            跳过
          </RouterLink>
        </>
      ),
    }}
  </WelcomeLayout>
);

Forth.displayName = "Forth";
