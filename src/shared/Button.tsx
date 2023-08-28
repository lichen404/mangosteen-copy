import { PropType, computed, defineComponent, ref } from "vue";
import s from "./Button.module.scss";

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    level: {
      type: String as PropType<"important" | "normal" | "danger">,
      default: "important",
    },
    type: {
      type: String as PropType<"submit" | "button">,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoSelfDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const selfDisabled = ref(false);
    const _disabled = computed(() => {
      if (props.autoSelfDisabled === false) {
        return props.disabled;
      }
      if (selfDisabled.value) {
        return true;
      } else {
        return props.disabled;
      }
    });
    const onClick = () => {
      props.onClick?.();
      selfDisabled.value = true;
      setTimeout(() => {
        selfDisabled.value = false;
      }, 500);
    };
    return () => (
      <button
        class={[s.button, s[props.level]]}
        disabled={props.disabled}
        type={props.type}
        onClick={onClick}
      >
        {context.slots.default?.()}
      </button>
    );
  },
});
