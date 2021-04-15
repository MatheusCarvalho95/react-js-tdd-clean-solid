import React, { FC, memo } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentAccountState } from "../atoms/atoms";

const PrivateRouter: FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  );
};
export default memo(PrivateRouter);
