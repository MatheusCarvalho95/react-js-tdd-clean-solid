import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
describe("AxiosHttpClient", () => {
  test("should call axios with correct URL and method ", async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
