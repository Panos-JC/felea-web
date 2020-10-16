import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

interface ProtectedRouteProps {
  component: React.FC;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  path,
  exact = false,
}) => {
  const [cookies] = useCookies(["qid"]);

  useEffect(() => {
    console.log(cookies);
  }, [cookies]);

  return cookies.qid ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};
