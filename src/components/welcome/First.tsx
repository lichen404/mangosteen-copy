import s from "./welcome.module.scss";
import { Icon } from "../Icon";
import { FunctionalComponent } from "vue";

export const First: FunctionalComponent = () => (
  <div class={s.card}>
    <Icon name="pig" />,
    <h2>
      会挣钱
      <br />
      还要会省钱
    </h2>
  </div>
);

First.displayName = "First";
