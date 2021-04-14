import faker from "faker";
import { LoadSurveyResult } from "../usecases";
import { SaveSurveyResult } from "../usecases/save-survey-result";

export const mockSaveResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(3),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(3),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.words(3),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: false,
    },
  ],
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
