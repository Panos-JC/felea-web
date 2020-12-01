import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import {
  EducationFieldsFragment,
  EducationsDocument,
  useDeleteEducationByAdminMutation,
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
  titleWrapper: {
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
  title: {
    lineHeight: 2,
    fontSize: 16,
    fontWeight: 600,
  },
  school: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  message: {
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },
}));

interface EducationProps {
  id: number;
  values: EducationFieldsFragment;
}

export const Education: React.FC<EducationProps> = ({ values, id }) => {
  const classes = useStyles();

  const [deleteEducation] = useDeleteEducationByAdminMutation();

  const handleDelete = async () => {
    await deleteEducation({
      variables: { educationId: values.id },
      refetchQueries: [
        { query: EducationsDocument, variables: { mentorId: id } },
      ],
    });
  };
  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{values.title}</Typography>
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

      <Typography className={classes.school}>{values.school}</Typography>
      <Typography className={classes.date}>2011 - 2019</Typography>
      <Typography className={classes.message}>{values.description}</Typography>
    </div>
  );
};
