import React, { FC, useEffect, useState } from "react";
import Styles from "./survey-result-styles.scss";
import Header from "@/presentation/components/header/header";
import Footer from "../../components/footer";
import LoadingScreen from "@/presentation/components/loading-screen/loading-screen";
import { LoadSurveyResult } from "@/domain/usecases";
import Error from "@/presentation/components/error/error";
import { useErrorHandler } from "@/presentation/hooks";
import Result from "./components/result/result";

type Props = {
  loadSurveyResult: LoadSurveyResult;
};
const SurveyResult: FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, error: error.message, surveyResult: null }));
  });
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
  });

  const reload = (): void => {
    setState((old) => ({
      surveyResult: null,
      reload: !old.reload,
      error: "",
      isLoading: false,
    }));
  };

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => setState((old) => ({ ...old, surveyResult })))
      .catch(handleError);
  }, [state.reload]);
  return (
    <>
      <div className={Styles.surveyResultWrap}>
        <Header />
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} />}

          {state.isLoading && <LoadingScreen />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SurveyResult;
