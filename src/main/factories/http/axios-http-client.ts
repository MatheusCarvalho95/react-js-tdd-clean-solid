import { AxiosHttpClient } from "@/infra/http/axios-http-client";

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  const axiosHttpClient = new AxiosHttpClient();
  return axiosHttpClient;
};
