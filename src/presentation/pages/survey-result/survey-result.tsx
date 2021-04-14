import React, { FC, useEffect, useState } from "react";
import Styles from "./survey-result-styles.scss";
import Header from "@/presentation/components/header/header";
import Footer from "../../components/footer";
import FlipMove from "react-flip-move";
import LoadingScreen from "@/presentation/components/loading-screen/loading-screen";
import Calendar from "@/presentation/components/calendar/calendar";
import { LoadSurveyResult } from "@/domain/usecases";
import Error from "@/presentation/components/error/error";

type Props = {
  loadSurveyResult: LoadSurveyResult;
};
const SurveyResult: FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: "",
    surveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  }, []);
  return (
    <>
      <div className={Styles.surveyResultWrap}>
        <Header />
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && (
            <>
              <hgroup>
                <Calendar date={new Date()} className={Styles.calendarWrap} />
                <h2>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus nostrum, laudantium, ...
                </h2>
              </hgroup>
              <FlipMove className={Styles.answersList}>
                <li>
                  <img src="" alt="" />
                  <span className={Styles.answer}>Survey answer prop</span>
                  <span className={Styles.percent}>% prop</span>
                </li>
              </FlipMove>
              <button>Voltar</button>
            </>
          )}

          {state.isLoading && <LoadingScreen />}
          {state.error && <Error error={state.error} reload={() => {}} />}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SurveyResult;
