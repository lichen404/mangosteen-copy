import { FunctionalComponent } from "vue";

export const Icon: FunctionalComponent<{ name: string }> = ({ name }) => (
  <svg>
    <use xlinkHref={`#${name}`} />
  </svg>
);
