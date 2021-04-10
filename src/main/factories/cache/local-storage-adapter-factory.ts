import { LocalStorageAdapter } from "@/infra/cache/local-storage-apapter";

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};
