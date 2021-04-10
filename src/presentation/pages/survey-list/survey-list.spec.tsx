import { SurveyModel } from "@/domain/models";
import { mockSurveyListModel } from "@/domain/test";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import SurveyList from "./survey-list";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
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
  test("should present 4 empty list items on first render", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
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
  });
});
