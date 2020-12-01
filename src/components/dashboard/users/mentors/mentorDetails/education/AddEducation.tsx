import MomentUtils from "@date-io/moment";
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  EducationInput,
  EducationsDocument,
  useCreateEducationByAdminMutation,
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
  title: string;
  school: string;
  description: string;
  from: string;
  untill: string;
};

interface AddEducationProps {
  id: number;
}

export const AddEducation: React.FC<AddEducationProps> = ({ id }) => {
  const classes = useStyles();

  const [addEducation, { loading }] = useCreateEducationByAdminMutation();

  const { register, handleSubmit, errors, control, reset } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const input: EducationInput = {
      title: formData.title,
      school: formData.school,
      from: formData.from,
      untill: formData.untill,
      description: formData.description,
    };

    const { data } = await addEducation({
      variables: { input, mentorId: id },
      refetchQueries: [
        { query: EducationsDocument, variables: { mentorId: id } },
      ],
    });

    if (data?.createEducationByAdmin.education) {
      reset();
    }
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Add Education
      </Typography>
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
              size="small"
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
