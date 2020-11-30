import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ExpertisesDocument,
  IsProfileCompleteDocument,
  RegularErrorFragment,
  useCreateExpertiseMutation,
} from "../../../generated/graphql";
import { RichEditor } from "../../richEditor/RichEditor";

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

interface NewSkillFormProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewSkillForm: React.FC<NewSkillFormProps> = ({ setEdit }) => {
  const classes = useStyles();

  // State
  const [fieldError, setFieldError] = useState<RegularErrorFragment>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // GraphQL
  const [
    createExpertise,
    { loading: createExpLoading },
  ] = useCreateExpertiseMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();

    const { data } = await createExpertise({
      variables: {
        skillName: formData.skill,
        description: JSON.stringify(contentRaw),
        descriptionText: plainText,
      },
      refetchQueries: [
        { query: ExpertisesDocument },
        { query: IsProfileCompleteDocument },
      ],
    });

    if (data?.createExpertise.error) {
      setFieldError(data.createExpertise.error);
    } else {
      setEdit(false);
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
        label="Message"
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
        disabled={createExpLoading}
        disableElevation
      >
        Add
      </Button>
    </form>
  );
};
