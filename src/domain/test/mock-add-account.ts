import faker from "faker";
import { AddAccount } from "../usecases";

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();

  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
