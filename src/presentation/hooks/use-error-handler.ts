import { AccessDeniedError } from "@/domain/errors";
import { useLogout } from "./use-logout";

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callBack: CallBackType): ResultType => {
  const logout = useLogout();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callBack(error);
    }
  };
};
