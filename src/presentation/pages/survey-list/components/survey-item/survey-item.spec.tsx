import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components/icon/icon";
import { render, screen } from "@testing-library/react";
import React from "react";
import SurveyItem from "./survey-item";

describe("SurveyItem", () => {
  test("should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnser = true;
    survey.date = new Date("2021-04-10T00:00:00");
    setTimeout(() => {
      return null;
    }, 1000);
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbsUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("month")).toHaveTextContent("abr");
    expect(screen.getByTestId("year")).toHaveTextContent("2021");
  });
});
