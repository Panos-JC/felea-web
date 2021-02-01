import { makeStyles, Typography, Chip, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import {
  useDeleteWorkExperienceByAdminMutation,
  WorkExperiencesDocument,
} from "../../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "&:hover": {
      "& .MuiButtonBase-root": {
        display: "inline-flex",
      },
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editIcon: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  deleteIcon: {
    "&:hover": {
      color: theme.palette.error.light,
    },
  },
  role: {
    lineHeight: 2,
    fontSize: 16,
    fontWeight: 600,
  },
  company: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  description: {
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },
  industries: {
    marginBottom: "1rem",
  },
  industryChip: {
    marginRight: "0.5rem",
    background: theme.palette.secondary.main,
  },
}));

interface WorkExperienceProps {
  mentorId: number;
  id: number;
  role: string;
  company: string;
  from: string;
  to: string;
  present: boolean;
  description: string;
  industries: any[] | undefined;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  mentorId,
  id,
  role,
  company,
  from,
  to,
  present,
  description,
  industries,
}) => {
  const classes = useStyles();

  const [deleteExperience] = useDeleteWorkExperienceByAdminMutation();

  const handleDelete = async () => {
    await deleteExperience({
      variables: { experienceId: id },
      refetchQueries: [
        { query: WorkExperiencesDocument, variables: { mentorId } },
      ],
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.role} variant="subtitle2">
          {role}
        </Typography>
        <div>
          <IconButton
            onClick={handleDelete}
            className={classes.deleteIcon}
            size="small"
          >
            <Delete />
          </IconButton>
        </div>
      </div>
      <Typography className={classes.company}>{company}</Typography>
      {present && (
        <Typography className={classes.date}>
          {`${moment(from).format("MMM YYYY")} - present`}
        </Typography>
      )}
      {!present && (
        <Typography className={classes.date}>
          {`${moment(from).format("MMM YYYY")} - ${moment(to).format(
            "MMM YYYY"
          )}`}
        </Typography>
      )}
      <Typography className={classes.description}>{description}</Typography>
      <div className={classes.industries}>
        {industries &&
          industries.map((industry) => (
            <Chip
              key={industry.name}
              className={classes.industryChip}
              color="secondary"
              size="small"
              label={industry.name}
            />
          ))}
      </div>
    </div>
  );
};
