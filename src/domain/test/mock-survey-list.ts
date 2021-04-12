import faker from "faker";
import { LoadSurveyList } from "../usecases/load-survey-list";

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  answers: [
    { image: faker.internet.url(), answer: faker.random.words(5) },
    { image: faker.internet.url(), answer: faker.random.words(5) },
  ],
  didAnser: faker.random.boolean(),
  date: faker.date.recent(),
});
