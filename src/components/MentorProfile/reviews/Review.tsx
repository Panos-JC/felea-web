import { makeStyles, Grid, Avatar, Typography, Card } from "@material-ui/core";
import React from "react";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  reviewer: {
    display: "flex",
    flexDirection: "column",
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  card: {
    padding: theme.spacing(2),
  },
}));

interface ReviewProps {
  firstName: string;
  lastName: string;
  avatar: string | null | undefined;
  message: string;
  date: string;
}

export const Review: React.FC<ReviewProps> = ({
  firstName,
  lastName,
  message,
  date,
  avatar,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={2}>
        <div className={classes.reviewer}>
          <Avatar src={avatar || ""} />
          <Typography variant="subtitle2">{`${firstName} ${lastName}`}</Typography>
          {/* <Typography className={classes.subtitle} variant="caption">
            2 sessions
          </Typography> */}
          <Typography className={classes.subtitle} variant="caption">
            {moment(date).format("D MMM YY")}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={10}>
        <Card className={classes.card}>
          <Typography variant="body2">{message}</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};
