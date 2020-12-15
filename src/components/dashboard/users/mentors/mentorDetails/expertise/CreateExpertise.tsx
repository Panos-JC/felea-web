import { makeStyles, TextField, Typography, Button } from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ExpertisesByIdDocument,
  RegularErrorFragment,
  useCreateExpertiseByAdminMutation,
} from "../../../../../../generated/graphql";
import { RichEditor } from "../../../../../shared/richEditor/RichEditor";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  textField: {
    fontSize: "0.875rem",
  },
  btn: {
    marginTop: theme.spacing(1),
  },
}));

type Inputs = {
  skill: string;
};

interface CreateExpertiseProps {
  id: number;
}

export const CreateExpertise: React.FC<CreateExpertiseProps> = ({ id }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<Inputs>();

  const [fieldError, setFieldError] = useState<RegularErrorFragment>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [createExpertise, { loading }] = useCreateExpertiseByAdminMutation();

  const onSubmit = async (formData: Inputs) => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();

    const { data } = await createExpertise({
      variables: {
        skillName: formData.skill,
        description: JSON.stringify(contentRaw),
        descriptionText: plainText,
        mentorId: id,
      },
      refetchQueries: [
        { query: ExpertisesByIdDocument, variables: { mentorId: id } },
      ],
    });

    if (data?.createExpertiseByAdmin.error) {
      setFieldError(data.createExpertiseByAdmin.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        className={classes.input}
        error={fieldError?.field === "skill"}
        helperText={fieldError?.field === "skill" ? fieldError.message : null}
        label="Skill"
        name="skill"
        placeholder="e.g. Mindset Coaching"
        variant="outlined"
        size="small"
      />
      <RichEditor
        error={fieldError?.field === "description"}
        errorText={
          fieldError?.field === "description" ? fieldError.message : null
        }
        label="Message (Optional)"
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <Typography variant="body2" color="textSecondary">
        Use this space to write a short message about your expertise
      </Typography>
      <Button
        className={classes.btn}
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        disableElevation
      >
        Add
      </Button>
    </form>
  );
};
