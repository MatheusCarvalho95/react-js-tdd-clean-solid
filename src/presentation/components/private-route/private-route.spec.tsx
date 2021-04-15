import { render } from "@testing-library/react";
import React from "react";
import PrivateRoute from "./private-route";
import { createMemoryHistory, MemoryHistory } from "history";
import { mockAccountModel } from "@/domain/test";
import { RenderWithHistory } from "@/presentation/test";
type SutTypes = {
  history: MemoryHistory;
};
const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  RenderWithHistory({
    history,
    Page: PrivateRoute,
    account,
  });

  return { history };
};

describe("PrivateRoute", () => {
  test("should redirect to login if token is empty", () => {
    const sut = makeSut(null);
    const { history } = sut;
    expect(history.location.pathname).toBe("/login");
  });

  test("should render current component if token is not empty", () => {
    const sut = makeSut();
    const { history } = sut;
    expect(history.location.pathname).toBe("/");
  });
});
