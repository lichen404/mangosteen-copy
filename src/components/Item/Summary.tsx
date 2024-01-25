import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import { Button } from "../../shared/Button";
import { FloatButton } from "../../shared/FloatButton";
import { http } from "../../shared/Http";
import s from "./Summary.module.scss";
import { Money } from "../../shared/Money";
import { Datetime } from "../../shared/DateTime";
import { Center } from "../../shared/Center";
import { Icon } from "../../shared/Icon";
import { RouterLink } from "vue-router";
import { useAfterMe } from "../../hooks/useAfterMe";
import { useItemStore } from "../../stores/useItemStore";

export const Summary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const itemStore = useItemStore(["items", props.startDate, props.endDate])();
    const { fetchItems, fetchNextPage } = itemStore;
    useAfterMe(() => fetchItems(props.startDate, props.endDate));
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.reset();
        fetchItems(props.startDate, props.endDate);
      }
    );
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    });
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get(
        "/items/balance",
        {
          happened_after: props.startDate,
          happened_before: props.endDate,
        },
        { _mock: "itemIndexBalance" }
      );
      Object.assign(itemsBalance, response.data);
    };
    useAfterMe(fetchItemsBalance);
    watch<any>(
      () => [props.startDate, props.endDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        });
        fetchItemsBalance();
      }
    );
    return () =>
      !props.startDate || !props.endDate ? (
        <div>请先选择时间范围</div>
      ) : (
        <div class={s.wrapper}>
          {itemStore.items && itemStore.items.length ? (
            <>
              <ul class={s.total}>
                <li>
                  <span>收入</span>
                  <Money value={itemsBalance.income} />
                </li>
                <li>
                  <span>支出</span>
                  <Money value={itemsBalance.expenses} />
                </li>
                <li>
                  <span>净收入</span>
                  <Money value={itemsBalance.balance} />
                </li>
              </ul>
              <ol class={s.list}>
                {itemStore.items.map((item) => (
                  <li>
                    <div class={s.sign}>
                      <span>
                        {item.tags && item.tags.length > 0
                          ? item.tags[0].sign
                          : "x"}
                      </span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        <span class={s.tag}>
                          {item.tags && item.tags.length > 0
                            ? item.tags![0].name
                            : "未分类"}
                        </span>
                        <span class={s.amount}>
                          {item.kind === "income" ? "+" : "-"} ￥
                          <Money value={item.amount} />
                        </span>
                      </div>
                      <div class={s.time}>
                        <Datetime value={item.happen_at} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div class={s.more}>
                {itemStore.hasMore ? (
                  <Button
                    onClick={() =>
                      fetchNextPage(props.startDate, props.endDate)
                    }
                  >
                    加载更多
                  </Button>
                ) : (
                  <span>没有更多</span>
                )}
              </div>
            </>
          ) : (
            <>
              <Center class={s.pig_wrapper} direction="vertical">
                <Icon name="pig" class={s.pig} />
                <p>目前没有数据</p>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
            </>
          )}
          <RouterLink to="/items/create">
            <FloatButton iconName="add" />
          </RouterLink>
        </div>
      );
  },
});
