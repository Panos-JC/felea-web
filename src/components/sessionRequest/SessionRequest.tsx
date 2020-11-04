import React from "react";
import { Layout } from "../layout/Layout";
import { RequestInfo } from "./requestInfo/RequestInfo";

interface SessionRequestProps {}

export const SessionRequest: React.FC<SessionRequestProps> = () => {
  return (
    <Layout maxWidth="md">
      <RequestInfo />
    </Layout>
  );
};
