import { mockAccountModel } from "@/domain/test";
import apiContext from "@/presentation/components/context/api/api-context";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import SurveyResult from "./survey-result";

const makeSut = (): any => {
  render(
    <apiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult />
    </apiContext.Provider>,
  );
};

describe("SurveyResult", () => {
  test("should present correct inital state", async () => {
    makeSut();

    expect(screen.queryByTestId("survey-result").childElementCount).toBe(0);
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });
});
