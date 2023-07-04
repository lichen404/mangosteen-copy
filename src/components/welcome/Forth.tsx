import s from "./welcome.module.scss";
import { Icon } from "../../shared/Icon";

export const Forth = () => (
  <div class={s.card}>
    <Icon name="cloud" />

    <h2>
      云备份
      <br />
      再也不怕数据丢失
    </h2>
  </div>
);

Forth.displayName = "Forth";
