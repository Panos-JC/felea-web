import React from "react";
import { Layout } from "../../shared/layout/Layout";

interface SessionRequestSuccessProps {}

export const SessionRequestSuccess: React.FC<SessionRequestSuccessProps> = () => {
  return (
    <Layout maxWidth="sm">
      <h4>Success</h4>
    </Layout>
  );
};
