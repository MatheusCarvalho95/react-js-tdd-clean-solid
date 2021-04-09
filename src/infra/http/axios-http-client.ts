import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient
  implements HttpPostClient<any>, HttpGetClient<any> {
  async post(params): Promise<HttpResponse<any>> {
    try {
      const axiosResponse = await axios.post(params.url, params.body);

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data,
      };
    }
  }

  async get(params: HttpGetParams): Promise<any> {
    try {
      const axiosResponse = await axios.get(params.url);
      return {
        status: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    }
  }
}
