import { makeStyles, Typography, Button } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

interface PageTitleProps {
  title: string;
  action?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, action }) => {
  const classes = useStyles();
  return (
    <div className={classes.titleWrapper}>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
      {action ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineOutlined />}
        >
          {action}
        </Button>
      ) : null}
    </div>
  );
};
