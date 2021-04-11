import { HttpGetParams } from "@/data/protocols";
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from "@/data/test";
import { mockAccountModel } from "@/domain/test";
import faker from "faker";
import { AuthorizeHttpGetClientDecorator } from "..";
type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};
const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy,
  );
  return { sut, getStorageSpy, httpGetClientSpy };
};
describe("AuthorizeHttpGetClientDecorator", () => {
  test("should call get storage with correct value", async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });

  test("should not add headers if get storage is invalid", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: { field: faker.random.words() },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers);
  });

  test("should add headers to http get client", async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("should merge headers to http get client", async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: { field },
    };
    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      field,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("should return the same result as http get client", async () => {
    const { sut, httpGetClientSpy } = makeSut();

    const httpResponse = await sut.get(mockGetRequest());
    expect(httpResponse).toEqual(httpGetClientSpy.response);
  });
});
