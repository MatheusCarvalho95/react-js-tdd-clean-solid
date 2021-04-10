import Footer from "../../components/footer";
import React, { FC, useEffect } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import { SurveyItem, SurveyItemEmpty } from "./components";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
type Props = {
  loadSurveyList: LoadSurveyList;
};
const SurveyList: FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      await loadSurveyList.loadAll();
    })();
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItem />
          <SurveyItemEmpty />
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
