import { SurveyList } from "@/presentation/pages";
import React, { FC } from "react";
import { makeRemoteSurveyList } from "../../usecases/survey-list/remote-survey-list-factory";

export const makeSurveyList: FC = () => {
  return <SurveyList loadSurveyList={makeRemoteSurveyList()} />;
};
