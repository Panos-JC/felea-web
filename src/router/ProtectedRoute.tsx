import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  const [cookies] = useCookies(["qid"]);

  console.log(cookies.qid);
  console.log(cookies);

  return cookies.qid ? (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};
