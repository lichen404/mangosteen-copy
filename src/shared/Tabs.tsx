import { PropType, defineComponent } from "vue";
import s from "./Tabs.module.scss";
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required: false,
    },
  },

  setup(props, context) {
    return () => {
      const array = context.slots.default?.();
      if (!array) {
        return () => null;
      }
      array.forEach((element) => {
        if (element.type !== Tab) {
          throw new Error("<Tabs> only accept <Tab> as children");
        }
      });

      return (
        <div class={s.tabs}>
          <ol class={s.tabs_nav}>
            {array.map((el) => (
              <li
                class={props.selected === el.props?.title ? s.selected : ""}
                onClick={() => context.emit("update:selected", el.props?.title)}
              >
                {el.props?.title}
              </li>
            ))}
          </ol>
          <div>
            {array.find((el) => el.props?.title === props.selected)}
          </div>
        </div>
      );
    };
  },
});

export const Tab = defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div>{context.slots.default?.()}</div>;
  },
});
