import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy, mockRemoteSurveyResultModel } from "@/data/test";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import faker from "faker";
import { RemoteLoadSurveyResult } from "./remote-load-survey-result";

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

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      data: mockRemoteSurveyResultModel(),
    };
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
  test("Should throw unexpected error in use error if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error in use error if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a survey result on 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyResultModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      data: httpResult,
    };
    const httpResponse = await sut.load();
    await expect(httpResponse).toEqual({
      question: httpResult.question,
      answers: httpResult.answers,
      date: new Date(httpResult.date),
    });
  });
});