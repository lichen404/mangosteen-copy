import { defineComponent } from "vue";
import { RouterView } from "vue-router";
 const ItemPage = defineComponent({
  setup(props, context) {
    return () => <RouterView />;
  },
});


export default ItemPage;