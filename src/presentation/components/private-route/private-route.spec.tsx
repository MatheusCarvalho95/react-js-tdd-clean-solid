import { render } from "@testing-library/react";
import React from "react";
import PrivateRoute from "./private-route";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { mockAccountModel } from "@/domain/test";
import { currentAccountState } from "../atoms/atoms";
type SutTypes = {
  history: MemoryHistory;
};
const makeSut = (account = mockAccountModel()): SutTypes => {
  const mockedState = {
    getCurrentAccount: () => account,
  };
  const history = createMemoryHistory({ initialEntries: ["/"] });
  render(
    <RecoilRoot
      initializeState={({ set }) => set(currentAccountState, mockedState)}
    >
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>,
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
