import { makeStyles, Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  active: {
    "& .MuiButton-root": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
}));

interface IndividualNavProps {}

export const IndividualNav: React.FC<IndividualNavProps> = () => {
  const classes = useStyles();
  return (
    <>
      <NavLink
        to="/user/requests"
        className={classes.link}
        activeClassName={classes.active}
      >
        <Button
          className={classes.menuButton}
          color="primary"
          variant="contained"
          disableElevation
        >
          My Requests
        </Button>
      </NavLink>
      <NavLink
        to="/mentors"
        className={classes.link}
        activeClassName={classes.active}
      >
        <Button
          className={classes.menuButton}
          color="primary"
          variant="contained"
          disableElevation
        >
          Browse Mentors
        </Button>
      </NavLink>
    </>
  );
};
