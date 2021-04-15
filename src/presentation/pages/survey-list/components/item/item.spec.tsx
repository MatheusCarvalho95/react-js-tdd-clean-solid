import { mockSurveyModel } from "@/domain/test";
import { IconName } from "@/presentation/components/icon/icon";
import { fireEvent, screen } from "@testing-library/react";
import SurveyItem from "./item";
import { createMemoryHistory, MemoryHistory } from "history";
import { RenderWithHistory } from "@/presentation/test";
type SutTypes = {
  history: MemoryHistory;
};
const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });

  RenderWithHistory({
    history,
    Page: () => SurveyItem({ survey: survey }),
  });

  return { history };
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

  test("should go to survey result", () => {
    const survey = mockSurveyModel();
    const { history } = makeSut(survey);
    fireEvent.click(screen.getByTestId("link"));
    expect(history.location.pathname).toBe(`/survey/${survey.id}`);
  });
});
