import { makeStyles } from "@material-ui/core";
import { Editor, EditorState } from "draft-js";
import React from "react";

const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    "& .public-DraftEditor-content": {
      height: 200,
      overflow: "auto",
      border: `1px solid rgba(0, 0, 0, 0.23)`,
      borderRadius: 5,
      padding: theme.spacing(1),
      "&:hover": {
        border: `1px solid rgba(0, 0, 0, 0.87)`,
      },
      "&:focus": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
}));

interface RichEditorProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export const RichEditor: React.FC<RichEditorProps> = ({
  editorState,
  setEditorState,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.editorWrapper}>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};
