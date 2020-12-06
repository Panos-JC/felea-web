import { makeStyles, MenuItem, ListItemIcon } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
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

interface IndividualMenuProps {
  handleClose: () => void;
}

export const IndividualMenu: React.FC<IndividualMenuProps> = ({
  handleClose,
}) => {
  const classes = useStyles();
  return (
    <MenuItem onClick={handleClose}>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <Link className={classes.link} to={`/setings`}>
        Settings
      </Link>
    </MenuItem>
  );
};
