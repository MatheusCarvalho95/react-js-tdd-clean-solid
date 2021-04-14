import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import {
  LoadSurveyResultSpy,
  mockAccountModel,
  mockSurveyResultModel,
} from "@/domain/test";
import apiContext from "@/presentation/components/context/api/api-context";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SurveyResult from "./survey-result";
import { createMemoryHistory, MemoryHistory } from "history";
import { AccountModel } from "@/domain/models";

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  setCurrentAccountMock: (Account: AccountModel) => void;
  history: MemoryHistory;
};
const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const history = createMemoryHistory({
    initialEntries: ["/", "/survey"],
    initialIndex: 1,
  });
  render(
    <apiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </apiContext.Provider>,
  );
  return { loadSurveyResultSpy, setCurrentAccountMock, history };
};

describe("SurveyResult", () => {
  test("should present correct inital state", async () => {
    makeSut();

    expect(screen.queryByTestId("survey-result").childElementCount).toBe(0);
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    await waitFor(() => screen.queryByTestId("survey-result"));
  });

  test("should call survey result", async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.queryByTestId("survey-result"));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test("should present survey result data on success", async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const date = new Date("2020-01-10T00:00:00");
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date,
    });
    loadSurveyResultSpy.surveyResult = surveyResult;
    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.queryByTestId("survey-result"));

    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("year")).toHaveTextContent("2020");
    expect(screen.getByTestId("question")).toHaveTextContent(
      surveyResult.question,
    );
    const answerWrap = screen.queryAllByTestId("answer-wrap");
    expect(answerWrap[0]).toHaveClass("active");
    expect(answerWrap[1]).not.toHaveClass("active");
    expect(screen.queryByTestId("answers").childElementCount).toBe(2);
    const images = screen.queryAllByTestId("image");
    expect(images[0]).toHaveAttribute("src", surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute("alt", surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answer = screen.queryAllByTestId("answer");
    expect(answer[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answer[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percent = screen.queryAllByTestId("percent");
    expect(percent[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`);
    expect(percent[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`);
  });

  test("should render error on failure", async () => {
    const error = new UnexpectedError();
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    jest.spyOn(loadSurveyResultSpy, "load").mockRejectedValueOnce(error);
    makeSut(loadSurveyResultSpy);

    await waitFor(() => screen.queryByTestId("survey-result"));

    expect(screen.queryByTestId("question")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });

  test("should call LoadSurveyResult on reload", async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();

    jest
      .spyOn(loadSurveyResultSpy, "load")
      .mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyResultSpy);

    await waitFor(() => screen.queryByTestId("survey-result"));
    fireEvent.click(screen.getByTestId("reload"));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.queryByTestId("survey-result"));
  });

  test("should go to survey list on back button click", async () => {
    const { history } = makeSut();
    await waitFor(() => screen.queryByTestId("survey-result"));
    fireEvent.click(screen.getByTestId("back-button"));
    expect(history.location.pathname).toBe("/");
  });

  //   test("should logout on access denied", async () => {
  //     const loadSurveyResultSpy = new LoadSurveyResultSpy();
  //     jest
  //       .spyOn(loadSurveyResultSpy, "load")
  //       .mockRejectedValueOnce(new AccessDeniedError());

  //     const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy);
  //     await waitFor(() => screen.queryByTestId("survey-result"));
  //     expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
  //     expect(history.location.pathname).toBe("/login");
  //   });
});
