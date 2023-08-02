import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { Summary } from "./Summary";
import dayjs from "dayjs";
import s from "./ItemList.module.scss";
import { Overlay } from "vant";
import { Form, FormItem } from "../../shared/Form";
import { OverlayIcon } from "../../shared/Overlay";

export const ItemList = defineComponent({
  setup(props, context) {
    const refSelected = ref<"本月" | "上月" | "今年" | "自定义">("本月");
    const day = dayjs();
    const customTime = reactive([
      dayjs().format("YYYY-MM-DD"),
      dayjs().format("YYYY-MM-DD"),
    ]);
    const timeList = [
      [
        day.startOf("month").format("YYYY-MM-DD"),
        day.endOf("month").format("YYYY-MM-DD"),
      ],
      [
        day.add(-1, "month").startOf("month").format("YYYY-MM-DD"),
        day.add(-1, "month").endOf("month").format("YYYY-MM-DD"),
      ],
      [
        day.startOf("year").format("YYYY-MM-DD"),
        day.endOf("year").format("YYYY-MM-DD"),
      ],
    ];
    const refOverlayVisible = ref(false);

    const onSubmitCustomTime = (e:Event)=>{
      e.preventDefault()
      refOverlayVisible.value = false
    }

    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => <OverlayIcon/>,
          default: () => (<>
            <Tabs
              v-model:selected={refSelected.value}
              classPrefix="customTabs"
              onUpdate:selected={(value) => {
                if (value === "自定义时间") {
                  refOverlayVisible.value = true;
                }
              }}
            >
              <Tab title="本月">
                <Summary startDate={timeList[0][0]} endDate={timeList[0][1]} />
              </Tab>
              <Tab title="上月">
                <Summary startDate={timeList[1][0]} endDate={timeList[1][1]} />
              </Tab>
              <Tab title="今年">
                <Summary startDate={timeList[2][0]} endDate={timeList[2][1]} />
              </Tab>
              <Tab title="自定义时间">
                <Summary startDate={customTime[0]} endDate={customTime[1]} />
              </Tab>
            </Tabs>
            <Overlay show={refOverlayVisible.value} class={s.overlay} >
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label='开始时间' v-model={customTime[0]} type='date' />
                    <FormItem label='结束时间' v-model={customTime[1]} type='date' />
                    <FormItem>
                      <div class={s.actions}>
                        <button type="button">取消</button>
                        <button type="submit">确认</button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
          
          ),
        }}
      </MainLayout>
    );
  },
});
