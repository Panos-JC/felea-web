import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import { Layout } from "../shared/layout/Layout";
import { UserRequestsTable } from "./userRequestsTable/UserRequestsTable";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

interface UserRequestsProps {}

export const UserRequests: React.FC<UserRequestsProps> = () => {
  const classes = useStyles();
  return (
    <Layout maxWidth="md">
      <Card className={classes.card}>
        <UserRequestsTable />
      </Card>
    </Layout>
  );
};
