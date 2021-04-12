import faker from "faker";
import "jest-localstorage-mock";
import { LocalStorageAdapter } from "./local-storage-apapter";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};
describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("should call localStorage set with correct values", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });
  test("should call localStorage remove item if value is null", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test("should call localStorage get with correct value", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    const getItemSpy = jest
      .spyOn(localStorage, "getItem")
      .mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
