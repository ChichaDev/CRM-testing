import { DeserializedValue } from "../utils/getFromLocalStorege";

export type User = {
  email?: string;
  phoneNumber?: string;
  id: string;
  displayName?: string;
  avatar?: string;
  isLoggedIn?: DeserializedValue;
  role?: string | null;
};
