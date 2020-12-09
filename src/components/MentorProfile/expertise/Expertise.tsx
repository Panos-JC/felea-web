import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import React from "react";
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
        display: "inline-flex",
      },
    },
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    lineHeight: 2,
    fontSize: 16,
    fontWeight: 600,
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
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },
}));

interface ExpertiseProps {
  id: number;
  skill: string;
  description: string;
  editable: boolean;
}

export const Expertise: React.FC<ExpertiseProps> = ({
  id,
  skill,
  description,
  editable,
}) => {
  const classes = useStyles();

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
        <Typography className={classes.title} variant="subtitle2">
          {skill}
        </Typography>
        {editable && (
          <div>
            {/* <IconButton
              onClick={() => setEdit(!edit)}
              className={classes.editBtn}
              size="small"
            >
              <Edit fontSize="inherit" />
            </IconButton> */}
            <IconButton
              onClick={handleDelete}
              className={classes.deleteBtn}
              size="small"
            >
              <Delete fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>

      {convertFromRaw(JSON.parse(description)).getPlainText() && (
        <Typography className={classes.text} component="div">
          <Editor
            readOnly
            onChange={(editorState) => null}
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(description))
            )}
          />
        </Typography>
      )}
    </div>
  );
};
