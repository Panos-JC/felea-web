import MomentUtils from "@date-io/moment";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Industry,
  useIndustriesQuery,
  useUpdateWorkExperienceMutation,
  WorkExperienceInput,
  WorkExperiencesDocument,
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
  role: string;
  company: string;
  description: string;
  from: string;
  untill: string;
  industries: Industry[];
};

interface Values {
  role: string;
  company: string;
  from: Date;
  to: Date;
  description: string;
  industries: any[] | undefined;
}

interface EditWorkExperienceProps {
  mentorId: number;
  id: number;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  values: Values;
}

export const EditWorkExperience: React.FC<EditWorkExperienceProps> = ({
  mentorId,
  id,
  setEdit,
  values,
}) => {
  const classes = useStyles();

  // GraphQL
  const { data, loading } = useIndustriesQuery();
  const [updateWorkExperience] = useUpdateWorkExperienceMutation();

  const { register, handleSubmit, errors, control } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const input: WorkExperienceInput = {
      role: formData.role,
      companyName: formData.company,
      from: formData.from,
      untill: formData.untill,
      description: formData.description,
      industries: formData.industries.map((industry) =>
        industry.name.toLowerCase()
      ),
    };

    const { data } = await updateWorkExperience({
      variables: { id, input },
      refetchQueries: [
        { query: WorkExperiencesDocument, variables: { mentorId } },
      ],
    });

    if (data?.updateWorkExperience.workExperience) {
      setEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.role ? true : false}
            helperText={errors.role ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="role"
            label="Role"
            name="role"
            autoFocus
            size="small"
            defaultValue={values.role}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.company ? true : false}
            helperText={errors.company ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="company"
            label="Company"
            name="company"
            size="small"
            defaultValue={values.company}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              control={control}
              name="from"
              defaultValue={new Date(values.from)}
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
              defaultValue={new Date(values.to)}
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Controller
              control={control}
              name="industries"
              defaultValue={values.industries}
              render={() => (
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={data?.industries as Industry[]}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) =>
                    option.name === value.name
                  }
                  defaultValue={values.industries}
                  ChipProps={{ size: "small" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors.industries ? true : false}
                      variant="outlined"
                      label="Industries"
                      placeholder="B2B, B2C..."
                      size="small"
                    />
                  )}
                />
              )}
            />
          )}
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
