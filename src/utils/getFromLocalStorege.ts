export type DeserializedValue =
  | string
  | number
  | boolean
  | any[]
  | Record<string, any>;

type ReturnType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T;

function getFromLocalStorage<T extends DeserializedValue>(
  id: string,
  defaultValue: T
): ReturnType<T> {
  const storedUser = localStorage.getItem(id);

  if (!storedUser) {
    return defaultValue as ReturnType<T>;
  }
  try {
    return JSON.parse(storedUser);
  } catch {
    return storedUser as ReturnType<T>;
  }
}

export default getFromLocalStorage;
