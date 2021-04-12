import faker from "faker";
import { AccountModel } from "../models/";
import { Authentication } from "../usecases";

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
  name: faker.name.findName(),
});
