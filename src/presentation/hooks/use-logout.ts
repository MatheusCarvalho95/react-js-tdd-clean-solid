import { useContext } from "react";
import { useHistory } from "react-router-dom";
import apiContext from "../components/context/api/api-context";

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(apiContext);
  return (): void => {
    setCurrentAccount(undefined);
    history.replace("/login");
  };
};
