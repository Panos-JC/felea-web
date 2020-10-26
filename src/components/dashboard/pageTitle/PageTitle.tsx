import { makeStyles, Typography, Button } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
}));

interface PageTitleProps {
  title: string;
  action?: string;
  to?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, action, to }) => {
  const classes = useStyles();
  return (
    <div className={classes.titleWrapper}>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {action && to ? (
        <Link to={to} className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineOutlined />}
          >
            {action}
          </Button>
        </Link>
      ) : null}
    </div>
  );
};
