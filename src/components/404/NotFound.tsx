import React from "react";
import { Layout } from "../layout/Layout";

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <Layout maxWidth="sm">
      <h1>404</h1>
    </Layout>
  );
};
