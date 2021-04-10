import { render, screen } from "@testing-library/react";
import React from "react";
import SurveyList from "./survey-list";

describe("Survey list component", () => {
  test("should present 4 empty list items on first render", () => {
    render(<SurveyList />);
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });
});
