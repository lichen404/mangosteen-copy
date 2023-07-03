import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = {
  x: number;
  y: number;
};

type Options = {
  beforeStart?: (e: TouchEvent) => void;
  afterStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  afterMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  afterEnd?: (e: TouchEvent) => void;
};

export const useSwipe = (
  element: Ref<HTMLElement | null>,
  options?: Options
) => {
  const start = ref<Point | null>(null);
  const end = ref<Point | null>(null);
  const swiping = ref(false);
  const distance = computed(() => {
    if (!start.value || !end.value) {
      return null;
    }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    };
  });
  const direction = computed(() => {
    if (!distance.value || !swiping.value) {
      return "";
    }
    const { x, y } = distance.value;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  });
  const onTouchStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    end.value = start.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    swiping.value = true;
    options?.afterStart?.(e);
  };

  const onTouchMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    end.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    options?.afterMove?.(e);
  };
  const onTouchEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    swiping.value = false;
    start.value = null;
    end.value = null;
    options?.afterEnd?.(e);
  };

  onMounted(() => {
    element.value?.addEventListener("touchstart", onTouchStart);
    element.value?.addEventListener("touchmove", onTouchMove);
    element.value?.addEventListener("touchend", onTouchEnd);
  });

  onUnmounted(() => {
    element.value?.removeEventListener("touchstart", onTouchStart);
    element.value?.removeEventListener("touchmove", onTouchMove);
    element.value?.removeEventListener("touchend", onTouchEnd);
  });

  return {
    swiping,
    distance,
    direction,
  };
};
