import { defineStore } from "pinia";
import { ref } from "vue";
import { http } from "../shared/Http";

export const useItemStore = (id: string[]) =>
  defineStore(id.join("-"), () => {
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const reset = () => {
      items.value = [];
      hasMore.value = false;
      page.value = 0;
    };
    const _fetch = async (
      firstPage: boolean,
      startDate?: string,
      endDate?: string
    ) => {
      if (!startDate || !endDate) {
        return;
      }
      const response = await http.get<Resources<Item>>(
        "/items",
        {
          happened_after: startDate,
          happened_before: endDate,
          page: firstPage ? 1 : page.value + 1,
        },
        {
          _mock: "itemIndex",
          _autoLoading: true,
        }
      );
      const { resources, pager } = response.data;
      if (firstPage) {
        items.value = resources;
      } else {
        items.value?.push(...resources);
      }

      hasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
      page.value += 1;
    };
    const fetchNextPage = (startDate?: string, endDate?: string) =>
      _fetch(false, startDate, endDate);
    const fetchItems = (startDate?: string, endDate?: string) =>
      _fetch(true, startDate, endDate);
    return {
      items,
      hasMore,
      page,
      reset,
      fetchItems,
      fetchNextPage,
    };
  });
