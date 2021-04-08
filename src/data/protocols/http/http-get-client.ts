import { HttpResponse } from "./http-response";

export interface HttpGetParams {
  url: string;
}

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>;
}
