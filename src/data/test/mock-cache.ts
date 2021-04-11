import faker from "faker";
import { GetStorage, SetStorage } from "../protocols";

export class SetStorageMock implements SetStorage {
  key: string;
  value: any;
  set(key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}

export class GetStorageSpy implements GetStorage {
  key: string;
  value: any = faker.random.objectElement();
  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
