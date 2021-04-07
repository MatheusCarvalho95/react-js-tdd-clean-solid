import { makeSignUp } from "@/main/factories/pages/signup/signup-factory";
import { SignUp } from "@/presentation/pages/";
import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../../styles/global.scss";

type Factory = {
  makeLogin: FC;
  makeSignUp: FC;
};

const Router: FC<Factory> = ({ makeLogin, makeSignUp }: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
