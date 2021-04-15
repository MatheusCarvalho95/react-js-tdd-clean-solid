import { UnexpectedError } from "@/domain/errors";
import {
  LoadSurveyResultSpy,
  mockSurveyResultModel,
  SaveSurveyResultSpy,
} from "@/domain/test";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import SurveyResult from "./survey-result";
import { createMemoryHistory, MemoryHistory } from "history";
import { AccountModel } from "@/domain/models";
import { RenderWithHistory } from "@/presentation/test";

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  setCurrentAccountMock: (Account: AccountModel) => void;
  history: MemoryHistory;
  saveSurveyResultSpy: SaveSurveyResultSpy;
};
type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
};
const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
}: SutParams = {}): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ["/", "/survey"],
    initialIndex: 1,
  });
  const { setCurrentAccountMock } = RenderWithHistory({
    history,
    Page: () =>
      SurveyResult({
        loadSurveyResult: loadSurveyResultSpy,
        saveSurveyResult: saveSurveyResultSpy,
      }),
  });

  return {
    loadSurveyResultSpy,
    setCurrentAccountMock,
    history,
    saveSurveyResultSpy,
  };
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
    makeSut({ loadSurveyResultSpy });
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
    makeSut({ loadSurveyResultSpy });

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
    makeSut({ loadSurveyResultSpy });

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

  test("should not present loading on active answer click", async () => {
    makeSut();
    await waitFor(() => screen.queryByTestId("survey-result"));
    const answerWrap = screen.queryAllByTestId("answer-wrap");
    fireEvent.click(answerWrap[0]);
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
  });

  test("should call save survey result on not active answer click", async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.queryByTestId("survey-result"));
    const answerWrap = screen.queryAllByTestId("answer-wrap");
    fireEvent.click(answerWrap[1]);
    expect(screen.queryByTestId("loading-screen")).toBeInTheDocument();
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer,
    });
    await waitFor(() => screen.queryByTestId("survey-result"));
  });

  test("should render error on failure to save", async () => {
    const error = new UnexpectedError();
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    jest.spyOn(saveSurveyResultSpy, "save").mockRejectedValueOnce(error);
    makeSut({ saveSurveyResultSpy });

    await waitFor(() => screen.queryByTestId("survey-result"));

    const answerWrap = screen.queryAllByTestId("answer-wrap");
    fireEvent.click(answerWrap[1]);
    await waitFor(() => screen.queryByTestId("survey-result"));
    expect(screen.queryByTestId("question")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });

  test("should present survey result data on save result success", async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    const surveyResult = {
      ...mockSurveyResultModel(),
      date: new Date("2018-02-20T00:00:00"),
    };
    saveSurveyResultSpy.surveyResult = surveyResult;
    makeSut({ saveSurveyResultSpy });
    await waitFor(() => screen.getByTestId("survey-result"));
    const answersWrap = screen.queryAllByTestId("answer-wrap");

    fireEvent.click(answersWrap[1]);
    await waitFor(() => screen.getByTestId("survey-result"));

    expect(screen.getByTestId("day")).toHaveTextContent("20");
    // expect(screen.getByTestId("month")).toHaveTextContent("fev");
    expect(screen.getByTestId("year")).toHaveTextContent("2018");
    expect(screen.getByTestId("question")).toHaveTextContent(
      surveyResult.question,
    );
    // expect(screen.getByTestId("answers").childElementCount).toBe(2);
    // expect(answersWrap[0]).toHaveClass("active");
    // expect(answersWrap[1]).not.toHaveClass("active");
    // const images = screen.queryAllByTestId("image");
    // expect(images[0]).toHaveAttribute("src", surveyResult.answers[0].image);
    // expect(images[0]).toHaveAttribute("alt", surveyResult.answers[0].answer);
    // expect(images[1]).toBeFalsy();
    // const answers = screen.queryAllByTestId("answer");
    // expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    // expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    // const percents = screen.queryAllByTestId("percent");
    // expect(percents[0]).toHaveTextContent(
    //   `${surveyResult.answers[0].percent}%`,
    // );
    // expect(percents[1]).toHaveTextContent(
    //   `${surveyResult.answers[1].percent}%`,
    // );
    expect(screen.queryByTestId("loading-screen")).not.toBeInTheDocument();
  });

  test("should prevent multiple answers click", async () => {
    const { saveSurveyResultSpy } = makeSut();

    await waitFor(() => screen.getByTestId("survey-result"));

    const answersWrap = screen.queryAllByTestId("answer-wrap");

    fireEvent.click(answersWrap[1]);
    fireEvent.click(answersWrap[0]);

    await waitFor(() => screen.getByTestId("survey-result"));

    expect(saveSurveyResultSpy.callsCount).toBe(1);
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
