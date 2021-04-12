import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { mockAccountModel, mockSurveyListModel } from "@/domain/test";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import apiContext from "@/presentation/components/context/api/api-context";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import SurveyList from "./survey-list";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import { AccountModel } from "@/domain/models";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}
type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: MemoryHistory;
  setCurrentAccountMock: (Account: AccountModel) => void;
};
const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const setCurrentAccountMock = jest.fn();
  render(
    <apiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </apiContext.Provider>,
  );
  return { loadSurveyListSpy, history, setCurrentAccountMock };
};

describe("Survey list component", () => {
  test("should present 4 empty list items on first render", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    await waitFor(() => surveyList);
  });

  test("should call load survey list", async () => {
    const { loadSurveyListSpy } = makeSut();

    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });

  test("should render survey items on success", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll("li.itemWrap").length).toBe(4);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
  test("should render error on failure", async () => {
    const error = new UnexpectedError();
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole("heading"));

    expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();

    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });
  test("should call LoadSurveyList on reload", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest
      .spyOn(loadSurveyListSpy, "loadAll")
      .mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);

    await waitFor(() => screen.getByRole("heading"));
    fireEvent.click(screen.getByTestId("reload"));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });
  test("should logout on access denied", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, "loadAll")
      .mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy);
    await waitFor(async () => screen.getByRole("heading"));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe("/login");
  });
});
