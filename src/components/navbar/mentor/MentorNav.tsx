import { makeStyles, Button } from "@material-ui/core";
import { FolderOpen } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    fontSize: 16,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface MentorNavProps {}

export const MentorNav: React.FC<MentorNavProps> = () => {
  const classes = useStyles();
  return (
    <Link to="/requests" className={classes.link}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<FolderOpen />}
        disableElevation
      >
        Requests
      </Button>
    </Link>
  );
};
