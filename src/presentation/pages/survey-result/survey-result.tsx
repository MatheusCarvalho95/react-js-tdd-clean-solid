import React, { FC, useEffect, useState } from "react";
import Styles from "./survey-result-styles.scss";
import Header from "@/presentation/components/header/header";
import Footer from "../../components/footer";
import FlipMove from "react-flip-move";
import LoadingScreen from "@/presentation/components/loading-screen/loading-screen";
import Calendar from "@/presentation/components/calendar/calendar";
import { LoadSurveyResult } from "@/domain/usecases";
import Error from "@/presentation/components/error/error";
import { useErrorHandler } from "@/presentation/hooks";
import { useHistory } from "react-router";

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

  const { goBack } = useHistory();

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
          {state.surveyResult && (
            <>
              <hgroup>
                <Calendar
                  date={state.surveyResult.date}
                  className={Styles.calendarWrap}
                />
                <h2 data-testid="question">{state.surveyResult.question}</h2>
              </hgroup>
              <FlipMove data-testid="answers" className={Styles.answersList}>
                {state.surveyResult.answers.map((item) => (
                  <li
                    data-testid="answer-wrap"
                    key={item.answer}
                    className={item.isCurrentAccountAnswer ? Styles.active : ""}
                  >
                    {item.image && (
                      <img
                        data-testid="image"
                        src={item.image}
                        alt={item.answer}
                      />
                    )}
                    <span data-testid="answer" className={Styles.answer}>
                      {item.answer}
                    </span>
                    <span data-testid="percent" className={Styles.percent}>
                      {`${item.percent}%`}
                    </span>
                  </li>
                ))}
              </FlipMove>
              <button data-testid="back-button" onClick={goBack}>
                Voltar
              </button>
            </>
          )}

          {state.isLoading && <LoadingScreen />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SurveyResult;
