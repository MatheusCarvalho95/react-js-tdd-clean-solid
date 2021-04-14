import { HttpStatusCode } from "@/data/protocols";
import { HttpClientSpy, mockRemoteSurveyListModel } from "@/data/test";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import faker from "faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe("RemoteLoadSurveyList", () => {
  test("should call HttpClient with correct url", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
  });

  test("Should throw access denied error in use error if HttpClient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new AccessDeniedError());
  });

  test("Should throw unexpected error in use error if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw unexpected error in use error if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should return a list of surveys if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      data: httpResult,
    };

    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        didAnser: httpResult[0].didAnser,
        date: new Date(httpResult[0].date),
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        didAnser: httpResult[1].didAnser,
        date: new Date(httpResult[1].date),
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        didAnser: httpResult[2].didAnser,
        date: new Date(httpResult[2].date),
      },
      {
        id: httpResult[3].id,
        question: httpResult[3].question,
        didAnser: httpResult[3].didAnser,
        date: new Date(httpResult[3].date),
      },
    ]);
  });

  test("Should return an empty array if HttpClient returns 204", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
