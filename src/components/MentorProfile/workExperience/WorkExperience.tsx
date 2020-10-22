import {
  Chip,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  workExperience: {
    // marginBottom: 30,
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  editIcon: {},
  role: {
    flexGrow: 1,
    fontSize: "0.875rem",
    color: theme.palette.text.primary,
  },
  company: {
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: "75%",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  industries: {
    marginBottom: "1rem",
  },
  industryChip: {
    marginRight: "0.5rem",
  },
}));

interface WorkExperienceProps {
  role: string;
  company: string;
  from: string;
  to: string;
  description: string;
  industries: any[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  role,
  company,
  from,
  to,
  description,
  industries,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.workExperience}>
      <div className={classes.title}>
        <Typography className={classes.role} variant="subtitle2">
          {role}
        </Typography>
        <IconButton className={classes.editIcon} size="small" color="secondary">
          <Edit />
        </IconButton>
      </div>
      <Typography className={classes.company}>{company}</Typography>
      <Typography className={classes.date}>
        {from} - {to}
      </Typography>
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
      >
        {description}
      </Typography>
      <div className={classes.industries}>
        {industries &&
          industries.map((industry) => (
            <Chip
              key={industry.name}
              className={classes.industryChip}
              label={industry.name}
            />
          ))}
      </div>
      <Divider />
    </div>
  );
};
