import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
  exact = false,
}) => {
  console.log(Cookies.get("qid"));

  return Cookies.get("qid") ? (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};
