import faker from "faker";
import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list";

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  didAnser: faker.random.boolean(),
  date: faker.date.recent().toISOString(),
});
