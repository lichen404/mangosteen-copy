import { DatetimePicker, Popup } from "vant";
import { computed, defineComponent, PropType, ref, VNode } from "vue";
import { EmojiSelect } from "./EmojiSelect";
import s from "./Form.module.scss";
import dayjs from "dayjs";
import { Button } from "./Button";
import { getFriendlyError } from "./getFriendlyError";

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number, Date],
    },
    type: {
      type: String as PropType<
        "text" | "emojiSelect" | "date" | "validationCode" | "select"
      >,
    },
    error: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array as PropType<{ label: string; value: string }[]>,
    },
    onClick: {
      type: Function as PropType<() => void>,
    },
    countFrom: {
      type: Number,
      default: 60,
    },
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup: (props, context) => {
    const refDateVisible = ref(false);
    const timer = ref<number>();
    const count = ref<number>(props.countFrom);
    const isCounting = computed(() => !!timer.value);

    const startCount = () => {
      timer.value = setInterval(() => {
        if (count.value > 0) {
          count.value -= 1;
        } else {
          clearInterval(timer.value);
          timer.value = undefined;
          count.value = props.countFrom;
        }
      }, 1000);
    };
    context.expose({ startCount });
    const content = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <input
              value={props.modelValue}
              onInput={(e: any) =>
                context.emit("update:modelValue", e.target.value)
              }
              placeholder={props.placeholder}
              class={[s.formItem, s.input]}
            />
          );
        case "validationCode":
          return (
            <>
              <input
                class={[s.formItem, s.input, s.validationCodeInput]}
                placeholder={props.placeholder}
                value={props.modelValue}
                onInput={(e: any) =>
                  context.emit("update:modelValue", e.target.value)
                }
              />
              <Button
                class={[s.formItem, s.button, s.validationCodeButton]}
                onClick={props.onClick}
                disabled={props.disabled || isCounting.value}
              >
                {isCounting.value
                  ? `${count.value}秒后可重新发送`
                  : "发送验证码"}
              </Button>
            </>
          );

        case "emojiSelect":
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdate:modelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={[s.formItem, s.emojiList, s.error]}
            />
          );
        case "date":
          return (
            <>
              <input
                readonly
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true;
                }}
                class={[s.formItem, s.input]}
              />
              <Popup position="bottom" v-model:show={refDateVisible.value}>
                <DatetimePicker
                  modelValue={
                    props.modelValue ? new Date(props.modelValue) : new Date()
                  }
                  type="date"
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit(
                      "update:modelValue",
                      dayjs(date).format("YYYY-MM-DD")
                    );
                    refDateVisible.value = false;
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          );
        case "select":
          return (
            <select
              class={[s.formItem, s.select]}
              value={props.modelValue}
              onChange={(e: any) => {
                context.emit("update:modelValue", e.target.value);
              }}
            >
              {props.options?.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          );
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => {
      return (
        <div class={s.formRow}>
          <label class={s.formLabel}>
            {props.label && <span class={s.formItem_name}>{props.label}</span>}
            <div class={s.formItem_value}>{content.value}</div>
            {
              <div class={s.formItem_errorHint}>
                <span>
                  {props.error ? getFriendlyError(props.error) : "　"}
                </span>
              </div>
            }
          </label>
        </div>
      );
    };
  },
});
