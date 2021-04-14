import { LoadSurveyResultSpy, mockAccountModel } from "@/domain/test";
import apiContext from "@/presentation/components/context/api/api-context";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SurveyResult from "./survey-result";

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};
const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  render(
    <apiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </apiContext.Provider>,
  );
  return { loadSurveyResultSpy };
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
});
