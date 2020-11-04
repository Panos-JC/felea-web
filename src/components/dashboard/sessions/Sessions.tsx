import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../pageTitle/PageTitle";
import { SessionsTable } from "./sessionTable/SessionsTable";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = () => {
  return (
    <>
      <PageTitle title="Sessions" to="/dashboard/sessions/new" />
      <Card>
        <SessionsTable />
      </Card>
    </>
  );
};
