import MomentUtils from "@date-io/moment";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Industry,
  useCreateWorkExperienceMutation,
  useIndustriesQuery,
  WorkExperienceInput,
  WorkExperiencesDocument,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  form: { marginBottom: 20 },
  picker: {
    width: "100%",
  },
  description: {
    width: "100%",
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

interface WorkExperienceFormProps {
  mentorId: number;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  mentorId,
  setEdit,
}) => {
  const classes = useStyles();

  const { data, loading } = useIndustriesQuery();

  const [createWorkExperience] = useCreateWorkExperienceMutation();

  const { register, handleSubmit, errors, control, setValue } = useForm<
    Inputs
  >();

  const onSubmit = async (formData: Inputs) => {
    const input: WorkExperienceInput = {
      role: formData.role,
      companyName: formData.company,
      description: formData.description,
      from: formData.from,
      untill: formData.untill,
      industries: formData.industries.map((industry) =>
        industry.name.toLowerCase()
      ),
    };

    console.log(input);

    const { data } = await createWorkExperience({
      variables: { input },
      refetchQueries: [
        { query: WorkExperiencesDocument, variables: { mentorId } },
      ],
    });

    setEdit(false);
  };

  useEffect(() => {
    register("industries");
  }, [register]);

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
          />
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              control={control}
              name="from"
              defaultValue={new Date()}
              render={({ onChange, value }) => (
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="From"
                  inputVariant="outlined"
                  value={value}
                  onChange={onChange}
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
              defaultValue={new Date()}
              render={({ onChange, value }) => (
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="Untill"
                  inputVariant="outlined"
                  value={value}
                  onChange={onChange}
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
          />
        </Grid>

        <Grid item xs={12}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Autocomplete
              multiple
              id="tags-standard"
              options={data?.industries as Industry[]}
              getOptionLabel={(option) => option.name}
              onChange={(event, values) => {
                setValue("industries", values);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors.industries ? true : false}
                  variant="outlined"
                  label="Industries"
                  placeholder="B2B, B2C..."
                />
              )}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
