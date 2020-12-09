import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import { useMeQuery } from "../../../generated/graphql";
import { Layout } from "../../shared/layout/Layout";
import { Loading } from "../../shared/loading/Loading";
import { GeneralInfoForm } from "./generalInfoForm/GeneralInfoForm";
import { SecurityInfoForm } from "./securityInfoForm/SecurityInfoForm";
import { UploadAvatar } from "./uploadAvatar/UploadAvatar";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
  },
  infoCard: {
    padding: 20,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  avatarTitle: {
    fontSize: "75%",
  },
  avatarBody: {
    fontSize: "11px",
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
  button: { width: "100%" },
  uploadInput: {
    display: "none",
  },
}));

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout maxWidth="md">
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={4}>
          <UploadAvatar avatar={data?.me?.avatar} />
        </Grid>
        <Grid item xs={8}>
          <GeneralInfoForm
            firstName={data?.me?.individual?.firstName}
            lastName={data?.me?.individual?.lastName}
            email={data?.me?.email}
          />
          <SecurityInfoForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
