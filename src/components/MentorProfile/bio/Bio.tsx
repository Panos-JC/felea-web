import { Button, Fab, makeStyles, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import {
  IsProfileCompleteDocument,
  MeDocument,
  useSetBioMutation,
} from "../../../generated/graphql";
import { GeneralCard } from "../../generalCard/GeneralCard";
import "draft-js/dist/Draft.css";
import { RichEditor } from "../../richEditor/RichEditor";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  fab: {
    position: "absolute",
    top: theme.spacing(3),
    right: -theme.spacing(2),
  },
  icon: {
    transition: "all 0.3s",
  },
  rotate: {
    transform: "rotate(45deg)",
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

interface BioProps {
  bio: string | null | undefined;
  editable: boolean;
}

export const Bio: React.FC<BioProps> = ({ bio, editable }) => {
  const classes = useStyles();

  // state
  const [edit, setEdit] = useState<boolean>(false);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const [editorDisplay, setEditorDisplay] = React.useState(() =>
    EditorState.createEmpty()
  );

  // GraphQL
  const [setBio] = useSetBioMutation();

  useEffect(() => {
    if (bio) {
      const rawContent = convertFromRaw(JSON.parse(bio));
      setEditorDisplay(EditorState.createWithContent(rawContent));
      setEditorState(EditorState.createWithContent(rawContent));
    }
  }, [bio]);

  const onSubmit = async () => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());

    await setBio({
      variables: { bio: JSON.stringify(contentRaw) },
      refetchQueries: [
        { query: MeDocument },
        { query: IsProfileCompleteDocument },
      ],
    });
    setEdit(false);
  };

  return (
    <GeneralCard title="About">
      {editable && (
        <Fab
          onClick={() => setEdit(!edit)}
          className={classes.fab}
          size="small"
          color="primary"
        >
          <Add className={`${classes.icon} ${edit && classes.rotate}`} />
        </Fab>
      )}
      <div className={classes.wrapper}>
        {edit && (
          <form>
            <RichEditor
              label="Bio"
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Button
              className={classes.button}
              onClick={onSubmit}
              variant="contained"
              color="primary"
              size="small"
              disableElevation
            >
              Save
            </Button>
          </form>
        )}
        {!edit && (
          <Typography variant="body2" color="textSecondary">
            <Editor
              readOnly
              onChange={(editorState) => null}
              editorState={editorDisplay}
            />
          </Typography>
        )}
      </div>
    </GeneralCard>
  );
};
