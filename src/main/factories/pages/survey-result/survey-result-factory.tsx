import { SurveyResult } from "@/presentation/pages";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { makeRemoteLoadSurveyResult } from "../../usecases/survey-result/remote-survey-result-factory";

export const makeSurveyResult: FC = () => {
  type Props = {
    id: string;
  };
  const { id } = useParams<Props>();

  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />;
};
