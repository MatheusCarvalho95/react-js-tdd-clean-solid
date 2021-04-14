import { HttpStatusCode } from "@/data/protocols";
import { HttpClientSpy } from "@/data/test";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { mockAccountModel, mockAddAccountParams } from "@/domain/test";
import faker from "faker";
import { RemoteAddAccount } from "./remote-add-account";

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
  });

  test("Should call HttpClient with correct body", async () => {
    const { sut, httpClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpClientSpy.body).toEqual(addAccountParams);
  });

  test("Should throw email in use error if HttpClient returns 403", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbiden,
    };
    const promisse = sut.add(mockAddAccountParams());
    await expect(promisse).rejects.toThrow(new EmailInUseError());
  });

  test("Should throw UnexpectedError if HttpClient returns 400", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = sut.add(mockAddAccountParams());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw UnexpectedError if HttpClient returns 500", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = sut.add(mockAddAccountParams());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should throw NotFoundError if HttpClient returns 404", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = sut.add(mockAddAccountParams());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });

  test("Should return an AccountModel if HttpClient returns 200", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      data: httpResult,
    };
    const account = await sut.add(mockAddAccountParams());
    await expect(account).toEqual(httpResult);
  });
});
