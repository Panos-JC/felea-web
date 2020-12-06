import { makeStyles, ListItemIcon, MenuItem } from "@material-ui/core";
import { Dashboard, Settings } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface AdminMenuProps {
  handleClose: () => void;
}

export const AdminMenu: React.FC<AdminMenuProps> = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <Link className={classes.link} to={`/dashboard`}>
          Dashboard
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <Link className={classes.link} to={`/dashboard/settings`}>
          Settings
        </Link>
      </MenuItem>
    </>
  );
};
