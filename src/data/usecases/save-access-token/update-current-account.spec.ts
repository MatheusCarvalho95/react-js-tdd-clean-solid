import { SetStorageMock } from "@/data/test";
import { mockAccountModel } from "@/domain/test";
import faker from "faker";
import { LocalUpdateCurrentAccount } from "./local-update-current-account";

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with the correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccountModel();
    await sut.save(account);
    expect(setStorageMock.key).toBe("account");
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  test("should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const account = mockAccountModel();
    const promise = sut.save(account);
    await expect(promise).rejects.toThrow(new Error());
  });
});
