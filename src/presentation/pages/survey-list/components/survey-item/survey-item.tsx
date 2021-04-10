import Icon, { IconName } from "@/presentation/components/icon/icon";
import React from "react";
import Styles from "./survey-item-styles.scss";

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.itemWrap}>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbsUp} className={Styles.iconWrap} />
        <time>
          <span className={Styles.day}>31</span>
          <span className={Styles.month}>10</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt est
          unde reiciendis dolor eveniet nisi qui porro aliquid consequatur,
          dicta animi et quisquam. Quo atque sit sint laudantium! Illum, alias?
        </p>
      </div>
      <footer>Ver Resultados</footer>
    </li>
  );
};

export default SurveyItem;
