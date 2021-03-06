import { RemoteLoadSurveyResult } from "@/data/usecases/load-survey-result/remote-load-survey-result";
import { LoadSurveyResult } from "@/domain/usecases";
import { makeAuthorizeHttpClientDecorator } from "../../decorators";
import { makeApiUrl } from "../../http/api-url-factory";

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator(),
  );
};
