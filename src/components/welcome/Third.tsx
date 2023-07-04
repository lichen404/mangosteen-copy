import s from "./welcome.module.scss";
import { Icon } from "../Icon";

export const Third = () => (
  <div class={s.card}>
    <Icon name="chart" />
    <h2>
      数据可视化
      <br />
      收支一目了然
    </h2>
  </div>
);

Third.displayName = "Third";
