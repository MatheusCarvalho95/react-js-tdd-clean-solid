import { mockAxios } from "../test";
import axios from "axios";
import { mockPostRequest } from "@/data/test/mock-http-post";
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
  test("should call axios with correct URL and method and body", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});

describe("AxiosHttpClient", () => {
  test("should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
