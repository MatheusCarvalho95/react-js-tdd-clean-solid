import { HttpStatusCode } from "@/data/protocols";
import { HttpClientSpy, mockRemoteSurveyResultModel } from "@/data/test";
import faker from "faker";
import { RemoteSaveSurveyResult } from "./remote-save-survey-result";

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe("RemoteSaveSurveyResult", () => {
  test("should call http get client with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      data: mockRemoteSurveyResultModel(),
    };
    await sut.save({ answer: faker.random.word() });
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("put");
  });
});
