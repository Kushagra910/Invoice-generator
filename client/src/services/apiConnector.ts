import axios, { Method, AxiosRequestHeaders, AxiosResponse } from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (
  method: Method,
  url: string,
  bodyData?: Record<string, any> | null,
  headers?: AxiosRequestHeaders | null,
  params?: Record<string, any> | null
): Promise<AxiosResponse<any>> => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? undefined,
    params: params ?? undefined,
  });
};
