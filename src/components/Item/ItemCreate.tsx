import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "./Tags";

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refTagId = ref<number>();
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab title="支出" class={s.tags_wrapper}>
                    <Tags kind="expenses" v-model:selected={refTagId.value} />
                  </Tab>
                  <Tab title="收入" class={s.tags_wrapper}>
                    <Tags kind="income" v-model:selected={refTagId.value} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad/>
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
