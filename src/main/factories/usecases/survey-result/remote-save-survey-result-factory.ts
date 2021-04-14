import { RemoteSaveSurveyResult } from "@/data/usecases/save-survey-result/remote-save-survey-result";
import { SaveSurveyResult } from "@/domain/usecases/save-survey-result";
import { makeAuthorizeHttpClientDecorator } from "../../decorators";
import { makeApiUrl } from "../../http/api-url-factory";

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator(),
  );
};
