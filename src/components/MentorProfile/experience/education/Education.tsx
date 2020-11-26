import { Grow, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import {
  EducationFieldsFragment,
  EducationsDocument,
  useDeleteEducationMutation,
} from "../../../../generated/graphql";
import { EditEducation } from "./editEducation/EditEducation";

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
  values: EducationFieldsFragment;
}

export const Education: React.FC<EducationProps> = ({ values }) => {
  const classes = useStyles();

  // State
  const [edit, setEdit] = useState<boolean>(false);

  const [deleteEducation] = useDeleteEducationMutation();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    await deleteEducation({
      variables: { id: values.id },
      refetchQueries: [{ query: EducationsDocument }],
    });
  };

  if (edit) {
    return (
      <Grow in={edit}>
        <div>
          <EditEducation setEdit={setEdit} values={values} />
        </div>
      </Grow>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{values.title}</Typography>
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
      </div>

      <Typography className={classes.school}>{values.school}</Typography>
      <Typography className={classes.date}>2011 - 2019</Typography>
      <Typography className={classes.message}>{values.description}</Typography>
    </div>
  );
};
