type JSONValue =
  | null
  | boolean
  | string
  | number
  | JSONValue[]
  | Record<string, JSONValue>;

type Tag = {
  id: number;
  user_id: number;
  name: string;
  sign: string;
  kind: expenses | income;
};

type Resources<T = any> = {
  resources: T[];
  pager: {
    page: number;
    per_page: number;
    count: number;
  };
};

type ResourceError = {
  errors: Record<string, string[]>;
};

type Resource<T> = {
  resource: T;
};

type Item = {
  id: number;
  user_id: number;
  amount: number;
  tags_id: number[];
  tags?: Tag[];
  happen_at: string;
  kind: expenses | income;
};

type User = {
  id: number;
  email: string;
}

