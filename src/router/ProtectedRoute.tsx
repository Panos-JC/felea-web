import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

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

  if (loading) return <div>Loading...</div>;

  return data && data.me ? (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};
