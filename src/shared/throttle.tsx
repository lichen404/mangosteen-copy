export const throttle = <T extends (...args: unknown[]) => any>(
  fn: T,
  time: number
) => {
  let timer: number | null = null;
  let result: ReturnType<T>;
  return (...args: Parameters<T>) => {
    if (!timer) {
      fn(...args);
      timer = setTimeout(() => {
        timer = null;
      }, time);
      return result;
    }
    return result;
  };
};
