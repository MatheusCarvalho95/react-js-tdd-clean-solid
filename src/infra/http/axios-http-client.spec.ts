import { mockAxios, mockHttpResponse } from "../test";
import axios from "axios";
import { mockGetRequest, mockPostRequest } from "@/data/test/mock-http";
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

describe("AxiosHttpClientPost", () => {
  test("should call axios post with correct URL and method and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test("should return correct statusCode and body on post", () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  test("should return correct statusCode and body on failure to post", () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse });
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});

describe("AxiosHttpClientGet", () => {
  test("should call axios get with correct URL and method and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockGetRequest();
    await sut.get(request);
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
      headers: request.headers,
    });
  });

  test("should return correct statusCode and body on get", async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.get(mockGetRequest());
    const axiosResponse = await mockedAxios.get.mock.results[0].value;
    expect(httpResponse).toEqual(axiosResponse);
  });

  test("should return correct statusCode and body on failure to get", () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.get.mockRejectedValueOnce({ response: mockHttpResponse });
    const promise = sut.get(mockGetRequest());
    expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
  });
});
