import { AccessDeniedError } from "@/domain/errors";
import { useLogout } from "./use-logout";
import { useHistory } from "react-router-dom";
import apiContext from "../components/context/api/api-context";
import { useContext } from "react";

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callBack: CallBackType): ResultType => {
  const logout = useLogout();
  const history = useHistory();
  const { setCurrentAccount } = useContext(apiContext);

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history.replace("/login");
    } else {
      callBack(error);
    }
  };
};
