import { AccessDeniedError } from "@/domain/errors";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import apiContext from "../components/context/api/api-context";

type CallBackType = (error: Error) => void;
type RultType = CallBackType;

export const useErrorHandler = (callBack: CallBackType): CallBackType => {
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
