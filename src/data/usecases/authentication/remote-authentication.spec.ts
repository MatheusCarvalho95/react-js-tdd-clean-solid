import { RemoteAuthentication } from "./remote-authentication";
import faker from "faker";
import { mockAuthentication } from "@/domain/test/mock-authentication";
import { HttpPostClientSpy } from "@/data/test/mock-http-client";
import InvalidCredentialsError from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import UnexpectedError from "@/domain/errors/unexpected-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import AccountModel from "@/domain/models/account-model";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });
});

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new InvalidCredentialsError());
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
});

describe("RemoteAuthentication", () => {
  test("Should throw NotFoundError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promisse = sut.auth(mockAuthentication());
    await expect(promisse).rejects.toThrow(new UnexpectedError());
  });
});
