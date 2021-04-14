import { HttpRequest } from "@/data/protocols";
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from "@/data/test";
import { mockAccountModel } from "@/domain/test";
import faker from "faker";
import { AuthorizeHttpClientDecorator } from "..";
type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy;
};
const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return { sut, getStorageSpy, httpClientSpy };
};
describe("AuthorizeHttpClientDecorator", () => {
  test("should call get storage with correct value", async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe("account");
  });

  test("should not add headers if get storage is invalid", async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      headers: { field: faker.random.words() },
      method: faker.random.arrayElement(["get", "post", "put", "delete"]),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  test("should add headers to http get client", async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(["get", "post", "put", "delete"]),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("should merge headers to http get client", async () => {
    const { sut, httpClientSpy, getStorageSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();
    const field = faker.random.words();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      headers: { field },
      method: faker.random.arrayElement(["get", "post", "put", "delete"]),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      field,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test("should return the same result as http get client", async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
