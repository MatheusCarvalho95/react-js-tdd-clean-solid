import { render } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { MutableSnapshot, RecoilRoot, RecoilState } from "recoil";
import { MemoryHistory } from "history";
import { currentAccountState } from "../components/atoms/atoms";
import { mockAccountModel } from "@/domain/test";
import { AccountModel } from "@/domain/models";
type Params = {
  Page: React.FC;
  history: MemoryHistory;
  account?: AccountModel;
  states?: Array<{ atom: RecoilState<any>; value: any }>;
};
type Result = {
  setCurrentAccountMock: (account: AccountModel) => void;
};
export const RenderWithHistory = ({
  Page,
  history,
  account = mockAccountModel(),
  states = [],
}: Params): Result => {
  const setCurrentAccountMock = jest.fn();

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  };
  const initializeState = ({ set }: MutableSnapshot): void => {
    [
      ...states,
      { atom: currentAccountState, value: mockedState },
    ].forEach((state) => set(state.atom, state.value));
  };

  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>,
  );
  return { setCurrentAccountMock };
};
