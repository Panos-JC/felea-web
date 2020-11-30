import { makeStyles, Card, Grid, Typography, Button } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useConfirmUserMutation } from "../../../generated/graphql";
import { Loading } from "../../loading/Loading";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: 50,
    marginBottom: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    marginTop: theme.spacing(2),
  },
}));

type Params = {
  token: string;
};

interface ActivateProps {}

export const Activate: React.FC<ActivateProps> = () => {
  const classes = useStyles();

  const { token } = useParams<Params>();

  const [confirmUser, { data, loading }] = useConfirmUserMutation();

  useEffect(() => {
    async function fetchData() {
      await confirmUser({ variables: { token } });
    }

    fetchData();
  }, [confirmUser, token]);

  if (loading) {
    return <Loading />;
  }

  if (data?.confirmUser) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <Check className={classes.icon} color="primary" />
            <Typography>Activated</Typography>
            <Link className={classes.link} to="/login">
              <Button variant="contained" color="primary" disableElevation>
                Login
              </Button>
            </Link>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <Close className={classes.icon} color="error" />
            <Typography>Please try again</Typography>
          </Card>
        </Grid>
      </Grid>
    );
  }
};
