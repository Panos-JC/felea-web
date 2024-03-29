import { makeStyles, Card, Typography, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 25,
    overflow: "inherit",
    position: "relative",
  },
  title: {
    position: "relative",
    padding: 20,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(-2.5),
    right: theme.spacing(-2.5),
  },
  content: {
    padding: 20,
  },
}));

interface GeneralCardProps {
  title: string;
  subtitle?: string;
}

export const GeneralCard: React.FC<GeneralCardProps> = ({
  title,
  subtitle,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.title}>
        <Typography variant="h6">{title}</Typography>
        {subtitle && (
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </div>

      <Divider />
      <div className={classes.content}>{children}</div>
    </Card>
  );
};
