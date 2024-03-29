import { onMounted } from "vue";
import { useMeStore } from "../stores/useMeStore";
import { storeToRefs } from "pinia";

export const useAfterMe = (fn: () => void) => {
  const { mePromise } = storeToRefs(useMeStore());
  onMounted(async () => {
    try {
      await mePromise;
    } catch (error) {
      return;
    }
    fn();
  });
};
