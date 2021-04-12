import { mockAccountModel } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-apapter";
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from "./current-account-adpter";

jest.mock("@/infra/cache/local-storage-apapter");

describe("CurrentAccountAdapter", () => {
  test("should call LocalStorageAdapter set with correct values", () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith("account", account);
  });

  test("should call LocalStorageAdapter get with correct values", () => {
    const account = mockAccountModel();
    const setSpy = jest
      .spyOn(LocalStorageAdapter.prototype, "get")
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(setSpy).toHaveBeenCalledWith("account");
    expect(result).toEqual(account);
  });
});
