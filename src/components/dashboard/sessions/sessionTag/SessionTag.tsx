import { makeStyles, Chip, fade } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  userTitles: {
    marginLeft: theme.spacing(1),
  },
  successChip: {
    backgroundColor: fade(theme.palette.success.light, 0.5),
    color: theme.palette.success.dark,
  },
  warnChip: {
    backgroundColor: fade(theme.palette.warning.light, 0.5),
    color: theme.palette.warning.dark,
  },
  errorChip: {
    backgroundColor: fade(theme.palette.error.light, 0.5),
    color: theme.palette.error.dark,
  },
  completeChip: {
    backgroundColor: fade(theme.palette.secondary.light, 0.5),
    color: theme.palette.secondary.dark,
  },
}));

interface SessionTagProps {
  status: string;
}

export const SessionTag: React.FC<SessionTagProps> = ({ status }) => {
  const classes = useStyles();

  const showStatusChip = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Chip label="Accepted" size="small" className={classes.successChip} />
        );
      case "declined":
        return (
          <Chip label="Declined" size="small" className={classes.errorChip} />
        );
      case "pending":
        return (
          <Chip label="Declined" size="small" className={classes.warnChip} />
        );
      case "complete":
        return (
          <Chip
            label="Complete"
            size="small"
            className={classes.completeChip}
          />
        );
      case "succeeded":
        return (
          <Chip label={status} size="small" className={classes.successChip} />
        );
      case "requires_capture":
        return (
          <Chip label={status} size="small" className={classes.warnChip} />
        );
      case "canceled":
        return (
          <Chip label={status} size="small" className={classes.errorChip} />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };
  return showStatusChip(status);
};
