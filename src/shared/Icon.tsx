import { defineComponent, PropType } from "vue";

export type IconName =
  | "add"
  | "chart"
  | "clock"
  | "cloud"
  | "mangosteen"
  | "menu"
  | "pig"
  | "charts"
  | "export"
  | "notify";

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg onClick={props.onClick}>
        <use xlinkHref={"#" + props.name}></use>
      </svg>
    );
  },
});
