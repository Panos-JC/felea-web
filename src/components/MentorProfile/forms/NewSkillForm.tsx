import { Button, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ExpertisesDocument,
  IsProfileCompleteDocument,
  Skill,
  useCreateExpertiseMutation,
  useSkillsQuery,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: 10,
  },
  textField: {
    fontSize: "0.875rem",
  },
}));

type Inputs = {
  skill: Skill;
  description: string;
};

interface NewSkillFormProps {
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewSkillForm: React.FC<NewSkillFormProps> = ({ setEdit }) => {
  const classes = useStyles();

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
    await createExpertise({
      variables: {
        skillId: formData.skill.id,
        description: formData.description,
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

      <TextField
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
      />
      <Button
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
