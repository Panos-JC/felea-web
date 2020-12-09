import { makeStyles, Button } from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import {
  GetBioDocument,
  useSetBioByMentorMutation,
} from "../../../../../../generated/graphql";
import { RichEditor } from "../../../../../shared/richEditor/RichEditor";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));

interface EditBioProps {
  mentorId: number;
}

export const EditBio: React.FC<EditBioProps> = ({ mentorId }) => {
  const classes = useStyles();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [setBio, { loading }] = useSetBioByMentorMutation();

  const onSubmit = async () => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());

    console.log(mentorId);

    await setBio({
      variables: { bio: JSON.stringify(contentRaw), mentorId },
      refetchQueries: [{ query: GetBioDocument, variables: { mentorId } }],
    });
  };
  return (
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
        disabled={loading}
        disableElevation
      >
        Save
      </Button>
    </form>
  );
};
