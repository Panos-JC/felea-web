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

interface AdminNavProps {}

export const AdminNav: React.FC<AdminNavProps> = () => {
  const classes = useStyles();

  return (
    <>
      <NavLink
        to="/products"
        className={classes.link}
        activeClassName={classes.active}
      >
        <Button
          className={classes.menuButton}
          color="primary"
          variant="contained"
          disableElevation
        >
          Products
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
