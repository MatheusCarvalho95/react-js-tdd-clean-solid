import { SurveyResult } from "@/presentation/pages";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { makeRemoteLoadSurveyResult } from "../../usecases/save-survey-result/remote-survey-result-factory";
import { makeRemoteSaveSurveyResult } from "../../usecases/survey-result/remote-save-survey-result-factory";

export const makeSurveyResult: FC = () => {
  type Props = {
    id: string;
  };
  const { id } = useParams<Props>();

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  );
};
