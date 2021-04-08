import faker from "faker";
import { SurveyModel } from "../models";

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.random.uuid(),
    question: faker.random.words(10),
    answers: [
      { image: faker.internet.url(), answer: faker.random.words(5) },
      { image: faker.internet.url(), answer: faker.random.words(5) },
    ],
    didAnser: faker.random.boolean(),
    date: faker.date.recent(),
  },
];
