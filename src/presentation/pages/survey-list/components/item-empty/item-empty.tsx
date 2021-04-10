import React from "react";
import Styles from "./item-empty-styles.scss";

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.itemWrap}></li>
      <li className={Styles.itemWrap}></li>
      <li className={Styles.itemWrap}></li>
      <li className={Styles.itemWrap}></li>
    </>
  );
};

export default SurveyItemEmpty;
