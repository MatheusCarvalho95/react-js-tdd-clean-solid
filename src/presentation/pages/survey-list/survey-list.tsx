import Footer from "../../components/footer";
import React, { FC } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import { SurveyItem, SurveyItemEmpty } from "./components";

const SurveyList: FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItem />
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
