import { makeStyles, IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import React from "react";
import {
  ExpertisesByIdDocument,
  useDeleteExpertiseByAdminMutation,
} from "../../../../../../generated/graphql";

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
  mentorId: number;
  description: string;
}

export const Expertise: React.FC<ExpertiseProps> = ({
  id,
  skill,
  description,
  mentorId,
}) => {
  const classes = useStyles();

  const [deleteExpertise] = useDeleteExpertiseByAdminMutation();

  const handleDelete = async () => {
    await deleteExpertise({
      variables: { expertiseId: id },
      refetchQueries: [
        { query: ExpertisesByIdDocument, variables: { mentorId } },
      ],
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title} variant="subtitle2">
          {skill}
        </Typography>
        <IconButton
          onClick={handleDelete}
          className={classes.deleteBtn}
          size="small"
        >
          <Delete fontSize="inherit" />
        </IconButton>
      </div>

      <Typography className={classes.text}>
        <Editor
          readOnly
          onChange={(editorState) => null}
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(description))
          )}
        />
      </Typography>
    </div>
  );
};
