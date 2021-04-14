import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import Calendar from "@/presentation/components/calendar/calendar";
import Icon, { IconName } from "@/presentation/components/icon/icon";
import React from "react";
import Styles from "./item-styles.scss";
type Props = {
  survey: LoadSurveyList.Model;
};
const SurveyItem: React.FC<Props> = (props: Props) => {
  const { survey } = props;
  const iconName = survey.didAnser ? IconName.thumbsUp : IconName.thumbsDown;

  return (
    <li className={Styles.itemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey?.question}</p>
      </div>
      <footer>Ver Resultados</footer>
    </li>
  );
};

export default SurveyItem;
