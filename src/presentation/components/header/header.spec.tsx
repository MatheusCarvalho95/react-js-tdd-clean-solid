import { fireEvent, screen } from "@testing-library/react";
import Header from "./header";
import { createMemoryHistory, MemoryHistory } from "history";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { RenderWithHistory } from "@/presentation/test";

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (Account: AccountModel) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const { setCurrentAccountMock } = RenderWithHistory({
    history,
    Page: Header,
    account,
  });
  return { history, setCurrentAccountMock };
};

describe("Header", () => {
  test("should call set current account with null", () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId("logout"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe("/login");
  });

  test("should render user name", () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId("username")).toHaveTextContent(account.name);
  });
});
