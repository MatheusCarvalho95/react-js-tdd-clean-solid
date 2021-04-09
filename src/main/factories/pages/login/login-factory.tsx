import { Login } from "@/presentation/pages";
import React, { FC } from "react";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLocalUpdateCurrentAccount } from "../../usecases/update-current-account/local-update-current-account-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin: FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
