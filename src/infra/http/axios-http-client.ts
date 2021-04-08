import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any> {
  async post(params): Promise<HttpResponse<any>> {
    try {
      const response = await axios.post(params.url, params.body);

      return {
        statusCode: response.status,
        body: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data,
      };
    }
  }
}
