import React, { FC, useEffect } from "react";
import Styles from "./survey-result-styles.scss";
import Header from "@/presentation/components/header/header";
import Footer from "../../components/footer";
import LoadingScreen from "@/presentation/components/loading-screen/loading-screen";
import { LoadSurveyResult } from "@/domain/usecases";
import Error from "@/presentation/components/error/error";
import { useErrorHandler } from "@/presentation/hooks";
import Result from "./components/result/result";
import { onSurveyAnswerState, surveyResultState } from "./components";
import { SaveSurveyResult } from "@/domain/usecases/save-survey-result";
import { useRecoilState, useSetRecoilState } from "recoil";

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};
const SurveyResult: FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({
      ...old,
      error: error.message,
      surveyResult: null,
      isLoading: false,
    }));
  });
  const [state, setState] = useRecoilState(surveyResultState);
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState);
  const reload = (): void => {
    setState((old) => ({
      surveyResult: null,
      reload: !old.reload,
      error: "",
      isLoading: false,
    }));
  };
  useEffect(() => {
    setOnAnswer({ onAnswer });
  }, []);
  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return;
    }

    setState((old) => ({ ...old, isLoading: true }));

    saveSurveyResult
      .save({ answer })
      .then((surveyResult) =>
        setState((old) => ({ ...old, isLoading: false, surveyResult })),
      )
      .catch(handleError);
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
