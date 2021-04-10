import { SurveyList } from "@/presentation/pages";
import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../../presentation/styles/global.scss";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";
import ApiContext from "../../presentation/components/context/api/api-context";
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "../adapters";
import PrivateRoute from "@/presentation/components/private-route/private-route";

const Router: FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={SurveyList} />
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={makeSignUp} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
