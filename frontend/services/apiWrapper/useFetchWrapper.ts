import { useAuthStore } from "~/store/auth.store";

export enum EApiUrls {
  BASE = "BASE",
  COINGECKO = "https://api.coingecko.com",
}

export enum EApiTypes {
  AUTH = "auth",
  DEFAULT = "default",
}

interface IApiConfig {
  baseUrl: EApiUrls;
  type: EApiTypes;
}

interface IError {
  data: {
    msg: string;
    statusCode: number;
  };
}
interface IApiResponse<T> {
  data: T;
  status: boolean;
}

interface IApiFetchOptions {
  body?: Record<string, unknown>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: Record<string, unknown>;
}

interface IApiAfterOptions<T, K> {
  immediate?: boolean;
  lazy?: boolean;
  server?: boolean;
  transform?: (data: T) => K;
}

interface IApiOptions<T, K> {
  after?: IApiAfterOptions<T, K>;
  fetch?: IApiFetchOptions;
}

export function useAPI<TFinalData, TRawData = TFinalData>(
  key: string,
  url: string,
  apiConfig: IApiConfig,
  options?: IApiOptions<TRawData, TFinalData>,
) {
  const typesHeaders = {
    [EApiTypes.DEFAULT]: () => {},
    [EApiTypes.AUTH]: () => {
      const accessToken = useCookie("authorization");
      if (!accessToken.value) return;

      return new Headers({
        Authorization: `Bearer ${accessToken.value}`,
      });
    },
  };

  const getAuthHeaders = (): Headers | void => typesHeaders[apiConfig.type]();

  const config = useRuntimeConfig();
  const baseConfigUrl = config.public.backendBaseUrl;

  const { data, error, pending, execute } = useAsyncData(
    key,
    () =>
      $fetch<IApiResponse<TRawData>>(url, {
        baseURL:
          apiConfig.baseUrl !== EApiUrls.BASE
            ? apiConfig.baseUrl
            : baseConfigUrl,
        body: options?.fetch?.body ?? undefined,
        headers: getAuthHeaders() ?? undefined,
        method: options?.fetch?.method ?? "GET",
        query: options?.fetch?.query ?? undefined,
      }),
    {
      immediate: false,
      ...options?.after,
      transform: (responseData) => {
        if (!responseData) return null;

        const parsedData = responseData;

        if (!parsedData) return null;

        // if (options?.after?.transform) {
        //   return options.after.transform(parsedData) as TFinalData;
        // }

        return parsedData as TFinalData;
      },
    },
  );

  watch(error, (errorValue) => {
    if (!errorValue) return;

    const errorVal = errorValue as IError;
    if (errorVal.data.statusCode === 401) {
      useAuthStore().logout();
    }

    // TODO добавить нотификационную обработку ошибок
    console.error(errorValue);
  });

  return { data, execute, pending };
}
