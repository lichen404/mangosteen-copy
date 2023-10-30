import { PropType, defineComponent } from "vue";
import s from "./Tabs.module.scss";
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<string>,
      required: false,
    },
    classPrefix: {
      type: String,
    },
    rerenderOnSelect: Boolean,
  },
  emits: ["update:selected"],
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
      const cp = props.classPrefix;
      return (
        <div class={[s.tabs, cp + "_tabs"]}>
          <ol class={[s.tabs_nav, cp + "_tabs_nav"]}>
            {array.map((el) => (
              <li
                class={[
                  props.selected === el.props?.value
                    ? [s.selected, cp + "selected"]
                    : "",
                  cp + "_tabs_nav_item",
                ]}
                onClick={() => context.emit("update:selected", el.props?.value)}
              >
                {el.props?.title}
              </li>
            ))}
          </ol>
          {props.rerenderOnSelect ? (
            <div key={props.selected}>
              {array.find((item) => item.props?.value === props.selected)}
            </div>
          ) : (
            <div>
              {array.map((item) => (
                <div v-show={item.props?.value === props.selected}>{item}</div>
              ))}
            </div>
          )}
        </div>
      );
    };
  },
});

export const Tab = defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    value: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => <div>{context.slots.default?.()}</div>;
  },
});
