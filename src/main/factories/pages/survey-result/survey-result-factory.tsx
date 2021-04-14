import { SurveyResult } from "@/presentation/pages";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { makeRemoteLoadSurveyResult } from "../../usecases/survey-result/remote-survey-result-factory";

export const makeSurveyResult: FC = () => {
  const { id } = useParams();

  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />;
};
