import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import {
  ExpertisesDocument,
  useDeleteExpertiseMutation,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: 20,
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "&:hover": {
      "& .MuiButtonBase-root": {
        display: "inherit",
      },
    },
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
    fontSize: "0.875rem",
    marginBottom: 5,
  },
  editBtn: {
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  deleteBtn: {
    "&:hover": {
      color: theme.palette.error.light,
    },
  },
  text: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface ExpertiseProps {
  id: number;
  skill: string;
  description: string;
}

export const Expertise: React.FC<ExpertiseProps> = ({
  id,
  skill,
  description,
}) => {
  const classes = useStyles();

  // State
  const [edit, setEdit] = useState<boolean>(false);

  const [deleteExpertise] = useDeleteExpertiseMutation();

  const handleDelete = async () => {
    await deleteExpertise({
      variables: { id },
      refetchQueries: [{ query: ExpertisesDocument }],
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        {edit}
        <Typography className={classes.title} variant="subtitle2">
          {skill}
        </Typography>
        <IconButton
          onClick={() => setEdit(!edit)}
          className={classes.editBtn}
          size="small"
        >
          <Edit fontSize="inherit" />
        </IconButton>
        <IconButton
          onClick={handleDelete}
          className={classes.deleteBtn}
          size="small"
        >
          <Delete fontSize="inherit" />
        </IconButton>
      </div>

      <Typography className={classes.text}>{description}</Typography>
    </div>
  );
};
