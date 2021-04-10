import { render } from "@testing-library/react";
import React from "react";
import PrivateRoute from "./private-route";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import ApiContext from "../context/api/api-context";
import { mockAccountModel } from "@/domain/test";
type SutTypes = {
  history: MemoryHistory;
};
const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>,
  );
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
