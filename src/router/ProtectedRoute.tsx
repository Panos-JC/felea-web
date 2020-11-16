import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { Loading } from "../components/loading/Loading";
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
  const [loading, setLoading] = useState(true);
  const { data, loading: dataLoading, error } = useMeQuery();

  useEffect(() => {
    if (data?.me) {
      setLoading(false);
    } else if (error) {
      // console.log(error);
      setLoading(false);
    }
  }, [data, error]);

  if (dataLoading || loading) return <Loading />;

  return data?.me ? (
    <Route path={path} exact={exact}>
      <Component />
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};
