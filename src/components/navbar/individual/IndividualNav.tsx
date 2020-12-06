import { makeStyles, Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface IndividualNavProps {}

export const IndividualNav: React.FC<IndividualNavProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Link to="/user/requests" className={classes.link}>
        <Button
          className={classes.menuButton}
          color="primary"
          variant="contained"
          disableElevation
        >
          My Requests
        </Button>
      </Link>
      <Link to="/mentors" className={classes.link}>
        <Button
          className={classes.menuButton}
          color="primary"
          variant="contained"
          disableElevation
        >
          Browse Mentors
        </Button>
      </Link>
    </>
  );
};
