import { GetStorageSpy, mockGetRequest } from "@/data/test";
import { AuthorizeHttpGetClientDecorator } from "..";

describe("AuthorizeHttpGetClientDecorator", () => {
  test("should call get storage with correct value", () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });
});
