import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import { Loading } from "../components/loading/Loading";

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
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  return data?.me ? (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};
