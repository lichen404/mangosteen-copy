import { defineComponent } from "vue";
import { Charts } from "../components/statistics/Charts";
import { TimeTabsLayout } from "../layouts/TimeTabsLayout";

const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout component={Charts} rerenderOnSwitchTab hideThisYear />
    );
  },
});

export default StatisticsPage;
