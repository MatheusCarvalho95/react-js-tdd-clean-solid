import { LoadSurveyResult } from "@/domain/usecases";
import Calendar from "@/presentation/components/calendar/calendar";
import React, { FC } from "react";
import FlipMove from "react-flip-move";
import { useHistory } from "react-router-dom";
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
          <li
            data-testid="answer-wrap"
            key={item.answer}
            className={item.isCurrentAccountAnswer ? Styles.active : ""}
          >
            {item.image && (
              <img data-testid="image" src={item.image} alt={item.answer} />
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
