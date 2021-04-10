import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { render, screen } from "@testing-library/react";
import React from "react";
import SurveyList from "./survey-list";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}
type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};
const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return { loadSurveyListSpy };
};

describe("Survey list component", () => {
  test("should present 4 empty list items on first render", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });

  test("should call load survey list", () => {
    const { loadSurveyListSpy } = makeSut();

    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
