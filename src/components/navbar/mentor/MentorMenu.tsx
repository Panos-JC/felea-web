import { makeStyles, MenuItem, ListItemIcon } from "@material-ui/core";
import { AccountCircle, Settings } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface MentorMenuProps {
  handleClose: () => void;
}

export const MentorMenu: React.FC<MentorMenuProps> = ({ handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <Link className={classes.link} to="/profile">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <Link className={classes.link} to={`/setings/profile`}>
          Settings
        </Link>
      </MenuItem>
    </>
  );
};
