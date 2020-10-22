import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Person, VpnKey } from "@material-ui/icons";
import React from "react";
import { Layout } from "../components/Layout";
import { SettingsForm } from "../components/MentorProfile/SettingsForm";

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
  buttons: {},
  button: { width: "100%", marginBottom: 10 },
}));

interface ProfileSettingsProps {}

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const classes = useStyles();

  return (
    <Layout maxWidth="md">
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={4}>
          <Card className={classes.infoCard}>
            <div className={classes.info}>
              <Avatar className={classes.avatar} alt="N" />
              <Typography className={classes.avatarTitle} variant="subtitle2">
                Change avatar
              </Typography>
              <Typography className={classes.avatarBody} variant="body2">
                Images must be .jpg or .png with minimum size of 300x300 pixels.
                Please upload square pictures to avoid distortion.
              </Typography>
            </div>
            <div className={classes.buttons}>
              <Button
                color="secondary"
                className={classes.button}
                startIcon={<Person />}
              >
                Profile
              </Button>
              <Button
                color="secondary"
                className={classes.button}
                startIcon={<VpnKey />}
              >
                Account
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <SettingsForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
