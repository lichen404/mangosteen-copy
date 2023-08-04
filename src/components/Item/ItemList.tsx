import { FunctionalComponent } from "vue";

import { Summary } from "./Summary";

import { TimeTabsLayout } from "../../layouts/TimeTabsLayout";

export const ItemList: FunctionalComponent = () => (
  <TimeTabsLayout component={Summary} />
);

ItemList.displayName = "ItemList";
