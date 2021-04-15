import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../../presentation/styles/global.scss";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "../adapters";
import PrivateRoute from "@/presentation/components/private-route/private-route";
import { makeSurveyList } from "../factories/pages/survey-list/survey-list-factory";
import { makeSurveyResult } from "../factories/pages/survey-result/survey-result-factory";
import { RecoilRoot } from "recoil";
import { currentAccountState } from "@/presentation/components/atoms/atoms";

const Router: FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
  };
  return (
    <RecoilRoot
      initializeState={(snapshot) => snapshot.set(currentAccountState, state)}
    >
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={makeSurveyList} />
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
          <PrivateRoute path="/survey/:id" component={makeSurveyResult} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
