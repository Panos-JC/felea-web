import { Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { convertToRaw, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ExpertisesDocument,
  IsProfileCompleteDocument,
  Skill,
  useCreateExpertiseMutation,
  useSkillsQuery,
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
  skill: Skill;
};

interface NewSkillFormProps {
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewSkillForm: React.FC<NewSkillFormProps> = ({ setEdit }) => {
  const classes = useStyles();

  // State
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // GraphQL
  const { data, loading } = useSkillsQuery();
  const [
    createExpertise,
    { loading: createExpLoading },
  ] = useCreateExpertiseMutation();

  const { register, handleSubmit, errors, setValue } = useForm<Inputs>();

  useEffect(() => {
    register("skill", { required: true });
  }, [register]);

  const onSubmit = async (formData: Inputs) => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());

    await createExpertise({
      variables: {
        skillId: formData.skill.id,
        description: JSON.stringify(contentRaw),
      },
      refetchQueries: [
        { query: ExpertisesDocument },
        { query: IsProfileCompleteDocument },
      ],
    });

    if (!createExpLoading && setEdit) {
      setEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Autocomplete
          className={classes.input}
          fullWidth
          size="small"
          options={data?.skills as Skill[]}
          getOptionLabel={(option) => option.name}
          onChange={(event, values) => {
            setValue("skill", values as Skill);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Skill"
              variant="outlined"
              error={errors.skill ? true : false}
              helperText={errors.skill ? "Required field" : null}
            />
          )}
        />
      )}

      {/* <TextField
        inputRef={register({ required: true })}
        error={errors.description ? true : false}
        helperText={errors.description ? "Required field" : null}
        className={classes.input}
        label="Description"
        multiline
        rows={6}
        variant="outlined"
        name="description"
        inputProps={{ className: classes.textField }}
      /> */}
      <RichEditor editorState={editorState} setEditorState={setEditorState} />
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
