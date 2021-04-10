import { SurveyModel } from "@/domain/models";
import Icon, { IconName } from "@/presentation/components/icon/icon";
import React from "react";
import Styles from "./survey-item-styles.scss";
type Props = {
  survey: SurveyModel;
};
const SurveyItem: React.FC<Props> = (props: Props) => {
  const { survey } = props;
  const iconName = survey.didAnser ? IconName.thumbsUp : IconName.thumbsDown;

  return (
    <li className={Styles.itemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.iconWrap} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, "0")}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date
              .toLocaleString("pt-Br", { month: "short" })
              .replace(".", "")}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey?.question}</p>
      </div>
      <footer>Ver Resultados</footer>
    </li>
  );
};

export default SurveyItem;
