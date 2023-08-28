type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: "required" } | { type: "pattern"; regex: RegExp });

export type Rules<T> = Rule<T>[];

export const validate = <T>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };
  const errors: Errors = {};
  rules.forEach((rule) => {
    const { key, type, message } = rule;
    const value = formData[key];
    switch (type) {
      case "required":
        if (value === null || value === undefined || value === "") {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case "pattern":
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  });
  return errors;
};



export function hasError(errors: Record<string, string[]>) {
  let result = false
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true
      break
    }
  }
  return result
}