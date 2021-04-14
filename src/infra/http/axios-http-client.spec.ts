import { mockAxios, mockHttpResponse } from "../test";
import axios from "axios";
import { mockHttpRequest } from "@/data/test/mock-http";
import { AxiosHttpClient } from "./axios-http-client";

jest.mock("axios");
type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  test("should call axios request with correct URL and method and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockHttpRequest();
    await sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method,
    });
  });

  test("should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.request(mockHttpRequest());
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });

  test("should return correct statusCode and body on failure", () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse });
    const promise = sut.request(mockHttpRequest());
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
