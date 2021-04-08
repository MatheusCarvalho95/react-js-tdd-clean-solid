import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { SurveyModel } from "@/domain/models";
import { mockSurveyListModel } from "@/domain/test";
import faker from "faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe("RemoteLoadSurveyList", () => {
  test("should call HttpGetClient with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);

    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test("Should throw unexpected error in use error if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error in use error if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error in use error if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a list of surveys if HttpGetClient returns 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual(httpResult);
  });

  test("Should return an empty array if HttpGetClient returns 204", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
