import {
  Chip,
  Grow,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import {
  useDeleteWorkExperienceMutation,
  WorkExperiencesDocument,
} from "../../../../generated/graphql";
import { EditWorkExperience } from "./editWorkExperience/EditWorkExperience";

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
  editable: boolean;
  mentorId: number;
  id: number;
  role: string;
  company: string;
  from: Date;
  to: Date;
  description: string;
  industries: any[] | undefined;
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  editable,
  mentorId,
  id,
  role,
  company,
  from,
  to,
  description,
  industries,
}) => {
  const classes = useStyles();

  // State
  const [edit, setEdit] = useState<boolean>(false);

  // GraphQL
  const [deleteWorkExperience] = useDeleteWorkExperienceMutation();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const { data } = await deleteWorkExperience({
      variables: { id },
      refetchQueries: [
        { query: WorkExperiencesDocument, variables: { mentorId } },
      ],
    });
    console.log(data?.deleteWorkExperience);
  };

  if (edit) {
    return (
      <Grow in={edit}>
        <div>
          <EditWorkExperience
            mentorId={mentorId}
            setEdit={setEdit}
            id={id}
            values={{ role, company, from, to, description, industries }}
          />
        </div>
      </Grow>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.role} variant="subtitle2">
          {role}
        </Typography>
        {editable && (
          <div>
            <IconButton
              onClick={handleEdit}
              className={classes.editIcon}
              size="small"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              className={classes.deleteIcon}
              size="small"
            >
              <Delete />
            </IconButton>
          </div>
        )}
      </div>
      <Typography className={classes.company}>{company}</Typography>
      <Typography className={classes.date}>
        {`${moment(from).format("MMM YYYY")} - ${moment(to).format(
          "MMM YYYY"
        )}`}
      </Typography>
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
