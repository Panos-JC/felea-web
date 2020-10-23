import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "75%",
    marginBottom: 5,
  },
  text: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface ExpertiseProps {
  skill: string;
  description: string;
}

export const Expertise: React.FC<ExpertiseProps> = ({ skill, description }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} variant="subtitle2">
        {skill}
      </Typography>
      <Typography className={classes.text}>{description}</Typography>
    </div>
  );
};
