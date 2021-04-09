import { mockAccountModel } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-apapter";
import { setCurrentAccountAdapter } from "./current-account-adpter";

jest.mock("@/infra/cache/local-storage-apapter");

describe("CurrentAccountAdapter", () => {
  test("should call LocalStorageAdapter with correct values", () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith("account", account);
  });
});
