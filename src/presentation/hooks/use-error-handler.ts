import { AccessDeniedError } from "@/domain/errors";
import { useLogout } from "./use-logout";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentAccountState } from "../components/atoms/atoms";

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callBack: CallBackType): ResultType => {
  const logout = useLogout();
  const history = useHistory();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history.replace("/login");
    } else {
      callBack(error);
    }
  };
};
