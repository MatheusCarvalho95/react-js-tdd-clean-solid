import { SurveyList } from "@/presentation/pages";
import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../../presentation/styles/global.scss";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";
const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SurveyList} />
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
