import { HttpStatusCode } from "@/data/protocols";
import { HttpGetClientSpy, mockRemoteSurveyListModel } from "@/data/test";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import faker from "faker";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
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

  test("Should throw access denied error in use error if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promisse = sut.loadAll();
    await expect(promisse).rejects.toThrow(new AccessDeniedError());
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
    const httpResult = mockRemoteSurveyListModel();
    httpGetClientSpy.response = {
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

  test("Should return an empty array if HttpGetClient returns 204", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
