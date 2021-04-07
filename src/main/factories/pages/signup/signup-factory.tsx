import { SignUp } from "@/presentation/pages";
import React, { FC } from "react";
import { makeRemoteAddAccount } from "../../usecases/authentication copy/remote-add-account-factory";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";

import { makeLocalSaveAccessToken } from "../../usecases/save-access-token/local-save-access-token-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUp: FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
