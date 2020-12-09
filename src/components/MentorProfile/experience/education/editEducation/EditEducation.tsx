import MomentUtils from "@date-io/moment";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  EducationFieldsFragment,
  EducationInput,
  EducationsDocument,
  useUpdateEducationMutation,
} from "../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  form: { marginBottom: 20 },
  picker: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

type Inputs = {
  title: string;
  school: string;
  from: string;
  untill: string;
  description: string;
};

interface EditEducationProps {
  values: EducationFieldsFragment;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditEducation: React.FC<EditEducationProps> = ({
  values,
  setEdit,
}) => {
  const classes = useStyles();

  // GraphQL
  const [updateEducation] = useUpdateEducationMutation();

  const { register, handleSubmit, errors, control } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const input: EducationInput = {
      title: formData.title,
      school: formData.school,
      from: formData.from,
      untill: formData.untill,
      description: formData.description,
    };

    const { data } = await updateEducation({
      variables: { id: values.id, input },
      refetchQueries: [{ query: EducationsDocument }],
    });

    if (data?.updateEducation.education) {
      setEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.title ? true : false}
            helperText={errors.title ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            size="small"
            defaultValue={values.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.school ? true : false}
            helperText={errors.school ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="school"
            label="School"
            name="school"
            size="small"
            defaultValue={values.school}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              control={control}
              name="from"
              defaultValue={values.startDate}
              render={({ onChange, value }) => (
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="From"
                  inputVariant="outlined"
                  value={value}
                  onChange={onChange}
                  size="small"
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              control={control}
              name="untill"
              defaultValue={values.endDate}
              render={({ onChange, value }) => (
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="Untill"
                  inputVariant="outlined"
                  value={value}
                  onChange={onChange}
                  size="small"
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.description ? true : false}
            helperText={errors.description ? "Required field" : null}
            autoComplete="off"
            className={classes.description}
            label="Description"
            name="description"
            multiline
            rows={7}
            placeholder="Write about your position"
            variant="outlined"
            size="small"
            defaultValue={values.description}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disableElevation
          >
            Save
          </Button>
          <Button
            className={classes.button}
            onClick={() => setEdit(false)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
