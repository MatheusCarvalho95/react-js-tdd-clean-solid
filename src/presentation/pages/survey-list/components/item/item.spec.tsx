import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components/icon/icon";
import { render, screen } from "@testing-library/react";
import React from "react";
import SurveyItem from "./item";

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe("SurveyItem", () => {
  test("should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnser = true;
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbsUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
  });

  test("should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnser = false;
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty(
      "src",
      IconName.thumbsDown,
    );
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
  });
});
