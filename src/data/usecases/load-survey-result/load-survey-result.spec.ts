import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy } from "@/data/test";
import { AccessDeniedError } from "@/domain/errors";
import faker from "faker";
import { RemoteLoadSurveyResult } from "./load-survey-result";

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe("RemoteLoadSurveyResult", () => {
  test("should call http get client with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw access denied error in use error if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });
});
