import { HttpClient, HttpRequest, HttpResponse } from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpClient<any> {
  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    try {
      const axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        headers: data.headers,
        method: data.method,
      });

      return {
        statusCode: axiosResponse.status,
        data: axiosResponse.data,
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        data: error.response.data,
      };
    }
  }
}
