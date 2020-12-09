import { Grid } from "@material-ui/core";
import React from "react";
import { useMeQuery } from "../../../generated/graphql";
import { SecurityInfoForm } from "../../account/settings/securityInfoForm/SecurityInfoForm";
import { UploadAvatar } from "../../account/settings/uploadAvatar/UploadAvatar";
import { Loading } from "../../shared/loading/Loading";
import { PageTitle } from "../pageTitle/PageTitle";
import { GeneralInfoForm } from "./generalInfoForm/GeneralInfoForm";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Settings" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <UploadAvatar avatar={data?.me?.avatar} />
        </Grid>
        <Grid item xs={12} md={5}>
          <GeneralInfoForm
            firstName={data?.me?.admin?.firstName}
            lastName={data?.me?.admin?.lastName}
            email={data?.me?.email}
          />
          <SecurityInfoForm />
        </Grid>
      </Grid>
    </>
  );
};
