import { LoadSurveyResult } from "@/domain/usecases";
import Calendar from "@/presentation/components/calendar/calendar";
import React, { FC } from "react";
import FlipMove from "react-flip-move";
import { useHistory } from "react-router-dom";
import Answer from "../answer/answer";
import Styles from "./result-styles.scss";
type Props = {
  surveyResult: LoadSurveyResult.Model;
};
const Result: FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answersList}>
        {surveyResult.answers.map((item) => (
          <div key={item.answer}>
            <Answer answer={item} />
          </div>
        ))}
      </FlipMove>
      <button
        data-testid="back-button"
        onClick={goBack}
        className={Styles.button}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
