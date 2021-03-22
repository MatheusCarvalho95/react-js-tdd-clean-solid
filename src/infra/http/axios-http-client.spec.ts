import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe("AxiosHttpClient", () => {
  test("should call axios with correct URL and method ", async () => {
    const sut = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});

// describe("AxiosHttpClient", () => {
//   test("should call axios with correct body", async () => {
//     const sut = makeSut();
//     await sut.post({ url });
//     expect(mockedAxios.post).toHaveBeenCalledWith(url);
//   });
// });
