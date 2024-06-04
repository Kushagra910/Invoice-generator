import axios, { Method, AxiosRequestHeaders, AxiosResponse } from "axios";

const axiosInstance = axios.create({});

export const apiConnector = async (
  method: Method,
  url: string,
  bodyData?: Record<string, any> | null,
  headers?: AxiosRequestHeaders | null,
  config?: Record<string, any> | null
): Promise<AxiosResponse<any>> => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? undefined,
    ...config  // Spread the config object to include any additional Axios request configurations
  });
};
