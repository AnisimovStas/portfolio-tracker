import {
  EApiTypes,
  EApiUrls,
  useAPI,
} from "~/services/apiWrapper/useFetchWrapper";
import type { IUser } from "~/store/auth.store";

export const getMe = () => {
  return useAPI<IUser, IUser>(
    "get-me",
    "/api/auth/getMe",
    {
      baseUrl: EApiUrls.BASE,
      type: EApiTypes.AUTH,
    },
    {
      after: {
        lazy: true,
      },
    },
  );
};
