import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ApiContext from "../context/api/api-context";
import Header from "./header";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock: (Account: AccountModel) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account,
      }}
    >
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>,
  );
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
