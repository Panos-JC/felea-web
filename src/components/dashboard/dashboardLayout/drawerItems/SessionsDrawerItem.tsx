import { ListItem, Button, makeStyles } from "@material-ui/core";
import { FolderOutlined } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  li: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  button: {
    width: "100%",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
    textTransform: "none",
  },
  navLink: {
    width: "100%",
    textDecoration: "none",
  },
  active: {
    "& .MuiButton-root": {
      color: theme.palette.primary.main,
    },
  },
}));

interface SessionsDrawerItemProps {}

export const SessionsDrawerItem: React.FC<SessionsDrawerItemProps> = () => {
  const classes = useStyles();
  return (
    <ListItem className={classes.li}>
      <NavLink
        to="/dashboard/sessions"
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <Button
          className={classes.button}
          size="large"
          startIcon={<FolderOutlined />}
        >
          Sessions
        </Button>
      </NavLink>
    </ListItem>
  );
};
