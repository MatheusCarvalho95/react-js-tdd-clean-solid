import { SurveyModel } from "@/domain/models";
import React, { FC, useContext } from "react";
import { SurveyContext, SurveyItem, SurveyItemEmpty } from "..";
import Styles from "./list-styles.scss";

const List: FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <ul className={Styles.listWarp} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey: SurveyModel) => (
          <SurveyItem survey={survey} key={survey.id} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
