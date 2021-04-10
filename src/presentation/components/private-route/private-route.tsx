import React, { FC, memo, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import apiContext from "../context/api/api-context";

const PrivateRouter: FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(apiContext);
  return getCurrentAccount()?.accessToken ? (
    <Route {...props} />
  ) : (
    <Route {...props} component={() => <Redirect to="/login" />} />
  );
};
export default memo(PrivateRouter);
