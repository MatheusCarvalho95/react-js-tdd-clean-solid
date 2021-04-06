import { SetStorageMock } from "@/data/test";
import faker from "faker";
import { LocalSaveAccessToken } from "./local-save-access-token";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with the correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test("should call SetStorage with the correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });
});
