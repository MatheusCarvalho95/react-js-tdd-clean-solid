import { Login } from "@/presentation/pages";
import React, { FC } from "react";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLocalSaveAccessToken } from "../../usecases/save-access-token/local-save-access-token-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLogin: FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
