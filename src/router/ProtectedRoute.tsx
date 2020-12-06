import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Loading } from "../components/loading/Loading";

interface ProtectedRouteProps extends RouteProps {
  component: React.FC;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const [wait, setWait] = useState(true);
  const { data, loading } = useMeQuery();

  useEffect(() => {
    // temporary fix
    // PROBLEM: right after login me query returns null
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);

  const renderRoute = (routeProps: RouteComponentProps) => {
    if (!data || loading || wait) {
      return <Loading />;
    }

    if (!data.me) {
      // user not logged in
      return <Redirect to="/login" />;
    }

    return <Component {...routeProps} />;
  };

  return <Route {...rest} render={renderRoute} />;
};
