import { makeStyles, CircularProgress } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};
