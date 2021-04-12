import Footer from "../../components/footer";
import React, { FC, useContext, useEffect, useState } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import { Error, SurveyContext, SurveyListItem } from "./components";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { AccessDeniedError } from "@/domain/errors";
import { useHistory } from "react-router-dom";
import apiContext from "@/presentation/components/context/api/api-context";
type Props = {
  loadSurveyList: LoadSurveyList;
};
const SurveyList: FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(apiContext);
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: "",
    reload: true,
  });
  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll();
        setState({ ...state, surveys });
      } catch (error) {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history.replace("/login");
        }
        setState({ ...state, error: error.message });
      }
    })();
  }, [state.reload]);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error.length ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
