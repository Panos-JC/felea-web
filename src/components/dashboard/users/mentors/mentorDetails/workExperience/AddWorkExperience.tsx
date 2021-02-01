import MomentUtils from "@date-io/moment";
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useCreateWorkExperienceByAdminMutation,
  WorkExperienceInput,
  WorkExperiencesDocument,
} from "../../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
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
  industries: string[];
  present: boolean;
};

interface AddWorkExperienceProps {
  id: number;
}

export const AddWorkExperience: React.FC<AddWorkExperienceProps> = ({ id }) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  const [addExperience, { loading }] = useCreateWorkExperienceByAdminMutation();

  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    register("industries");
  }, [register]);

  const onSubmit = async (formData: Inputs) => {
    const input: WorkExperienceInput = {
      role: formData.role,
      companyName: formData.company,
      description: formData.description,
      from: formData.from,
      untill: formData.untill,
      present: formData.present,
      industries: formData.industries,
    };

    const { data } = await addExperience({
      variables: { input, mentorId: id },
      refetchQueries: [
        { query: WorkExperiencesDocument, variables: { mentorId: id } },
      ],
    });

    if (data?.createWorkExperienceByAdmin.workExperience) {
      reset();
    }
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Add Work Experience
      </Typography>
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
              size="small"
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
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              onChange={() => setChecked(!checked)}
              label="I am currently working in this role"
              name="present"
              inputRef={register}
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
                    size="small"
                  />
                )}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          {!checked && (
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
                      size="small"
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          )}

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
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={[]}
              freeSolo
              onChange={(event, values) => {
                setValue("industries", values);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errors.industries ? true : false}
                  helperText="Tip: Type an industry and hit enter. You can type more than one industries"
                  variant="outlined"
                  label="Industries"
                  placeholder="B2B, B2C..."
                  size="small"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              disabled={loading}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
