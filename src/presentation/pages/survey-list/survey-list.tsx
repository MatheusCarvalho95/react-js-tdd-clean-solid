import Footer from "../../components/footer";
import React, { FC, useEffect, useState } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import { SurveyItem, SurveyItemEmpty } from "./components";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { SurveyModel } from "@/domain/models";
type Props = {
  loadSurveyList: LoadSurveyList;
};
const SurveyList: FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  });
  useEffect(() => {
    (async function () {
      const surveys = await loadSurveyList.loadAll();

      setState({ surveys });
    })();
  }, []);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {state.surveys.length > 0 ? (
            state.surveys.map((survey) => (
              <SurveyItem survey={survey} key={survey.id} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
