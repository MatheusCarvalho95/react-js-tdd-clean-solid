import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { makeAuthorizeHttpGetClientDecorator } from "../../decorators";
import { makeApiUrl } from "../../http/api-url-factory";

export const makeRemoteSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl("/surveys"),
    makeAuthorizeHttpGetClientDecorator(),
  );
};
