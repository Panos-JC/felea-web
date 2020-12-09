import { makeStyles, Typography } from "@material-ui/core";
import { Editor, EditorState } from "draft-js";
import React from "react";

const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    position: "relative",
    "& .public-DraftEditor-content": {
      height: 200,
      overflow: "auto",
      border: `1px solid rgba(0, 0, 0, 0.23)`,
      borderRadius: 5,
      padding: theme.spacing(1),
    },
  },
  editorBorder: {
    "& .public-DraftEditor-content": {
      "&:hover": {
        border: `1px solid rgba(0, 0, 0, 0.87)`,
      },
      "&:focus": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
  error: {
    "& .public-DraftEditor-content": {
      border: `2px solid ${theme.palette.error.main}`,
    },
  },
  errorText: {
    color: theme.palette.error.main,
  },
  label: {},
}));

interface RichEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  label: string;
  error?: boolean;
  errorText?: string | null;
}

export const RichEditor: React.FC<RichEditorProps> = ({
  editorState,
  setEditorState,
  label,
  error = false,
  errorText = null,
}) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.editorWrapper} ${
        error ? classes.error : classes.editorBorder
      }`}
    >
      <Typography className={classes.label}>{label}</Typography>
      <Editor editorState={editorState} onChange={setEditorState} />
      {errorText && (
        <Typography className={classes.errorText}>{errorText}</Typography>
      )}
    </div>
  );
};
