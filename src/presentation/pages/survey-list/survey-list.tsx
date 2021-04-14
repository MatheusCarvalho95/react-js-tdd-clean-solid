import Footer from "../../components/footer";
import React, { FC, useEffect, useState } from "react";
import Styles from "./survey-list-styles.scss";
import Header from "@/presentation/components/header/header";
import { SurveyContext, SurveyListItem } from "./components";
import { LoadSurveyList } from "@/domain/usecases/load-survey-list";
import { useErrorHandler } from "@/presentation/hooks";
import Error from "../../components/error/error";

type Props = {
  loadSurveyList: LoadSurveyList;
};
const SurveyList: FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message });
  });
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: "",
    reload: true,
  });
  const reload = (): void => {
    setState((old) => ({
      surveys: [],
      error: "",
      reload: !old.reload,
    }));
  };
  useEffect(() => {
    (async function () {
      try {
        const surveys = await loadSurveyList.loadAll();
        setState({ ...state, surveys });
      } catch (error) {
        handleError(error);
      }
    })();
  }, [state.reload]);
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error.length ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  );
};
export default SurveyList;
