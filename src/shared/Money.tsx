import { defineComponent } from "vue";


const addZero = (n: number) => {
  const nString = n.toString();
  const dotIndex = nString.indexOf(".");
  if (dotIndex < 0) {
    return nString + ".00";
  } else if (nString.substring(dotIndex).length === 2) {
    return nString + "0";
  } else {
    return nString;
  }
};

export const Money = defineComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
  

    return () => <span>{addZero(props.value)}</span>;
  },
});


export const getMoney = (n: number) => {
  return addZero(n)
}
