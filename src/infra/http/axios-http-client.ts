import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any> {
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

  async get(params: HttpGetParams): Promise<void> {
    try {
      await axios.get(params.url);
// const axiosResponse = 
    //   return {
    //     statusCode: axiosResponse.status,
    //     body: axiosResponse.data,
    //   };
    // } catch (error) {
    //   return {
    //     statusCode: error.response.status,
    //     body: error.response.data,
    //   };
    // }
  }
}
