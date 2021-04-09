import { SignUp } from "@/presentation/pages";
import React, { FC } from "react";
import { makeRemoteAddAccount } from "../../usecases/add-account/remote-add-account-factory";
import { makeLocalUpdateCurrentAccount } from "../../usecases/update-current-account/local-update-current-account-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

export const makeSignUp: FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  );
};
