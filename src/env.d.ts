type JSONValue = null | boolean | string | number | JSONValue[] | Record<string, JSONValue>

type Tag = {
    id: number,
    user_id: number,
    name: string,
    sign: string,
    kind: expenses | income
  }

  
type Resources<T = any> = {
  resources: T[]
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}