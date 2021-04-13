import faker from "faker";
import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list";
import { RemoteLoadSurveyResult } from "../usecases/load-survey-result/remote-load-survey-result";

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(2),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean();
    },
    {
      answer: faker.random.words(2),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: faker.random.boolean();
    },
  ],
});
