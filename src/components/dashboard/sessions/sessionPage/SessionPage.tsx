import { Grid } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../../pageTitle/PageTitle";
import { SessionInfo } from "./sessionInfo/SessionInfo";

interface SessionPageProps {}

export const SessionPage: React.FC<SessionPageProps> = () => {
  return (
    <>
      <PageTitle title="Session" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <SessionInfo />
        </Grid>
      </Grid>
    </>
  );
};
