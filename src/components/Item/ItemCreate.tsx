import { defineComponent, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";

export const ItemCreate = defineComponent({
  setup(props, context) {
    const refKind = ref('支出');
    return () => (
      <MainLayout>
        {{
          title: ()=>"记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
             <Tabs v-model:selected={refKind.value}>
                <Tab title="支出">
                    icon 列表
                </Tab>
                <Tab title="收入">
                    icon列表2
                </Tab>
             </Tabs>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
