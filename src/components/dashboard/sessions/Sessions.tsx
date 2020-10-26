import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../pageTitle/PageTitle";
import { SessionsTable } from "./SessionsTable";

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = () => {
  return (
    <>
      <PageTitle
        title="Sessions"
        action="Log New Session"
        to="/dashboard/sessions/new"
      />
      <Card>
        <SessionsTable />
      </Card>
    </>
  );
};
