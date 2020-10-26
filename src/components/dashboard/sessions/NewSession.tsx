import MomentUtils from "@date-io/moment";
import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Individual,
  Mentor,
  SessionInput,
  SessionsDocument,
  useCreateSessionMutation,
  useIndividualsQuery,
  useMentorsQuery,
} from "../../../generated/graphql";
import { PageTitle } from "../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
  avatar: {
    marginRight: 10,
    width: 25,
    height: 25,
  },
  input: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

type Inputs = {
  date: MaterialUiPickersDate;
  mentor: Mentor;
  user: Individual;
};

interface NewSessionProps {}

export const NewSession: React.FC<NewSessionProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { register, handleSubmit, setValue, control, errors } = useForm<
    Inputs
  >();

  const { data: mentors, loading: mentorsLoading } = useMentorsQuery();
  const {
    data: individuals,
    loading: individualsLoading,
  } = useIndividualsQuery();

  const [createSession] = useCreateSessionMutation({
    refetchQueries: [{ query: SessionsDocument }],
  });

  useEffect(() => {
    register("mentor", { required: true });
    register("user", { required: true });
  }, [register]);

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const input: SessionInput = {
      mentorId: formData.mentor.id,
      userId: formData.user.id,
      date: formData.date,
    };

    await createSession({ variables: { input } });

    history.push("/dashboard/sessions");
  };
  if (mentorsLoading || individualsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <PageTitle title="Add Session" />
      <Grid container spacing={2}>
        <Grid item md={6} lg={4} xs={12}>
          <Card className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {mentors && mentors.mentors && (
                <Autocomplete
                  className={classes.input}
                  options={mentors.mentors}
                  onChange={(event, newValue) => {
                    setValue("mentor", newValue as Mentor);
                  }}
                  renderOption={(option) => (
                    <>
                      <Avatar
                        src={option.user.avatar}
                        className={classes.avatar}
                      />
                      {`${option.firstName} ${option.lastName}`}
                    </>
                  )}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors.mentor ? true : false}
                      helperText={errors.mentor ? "Required" : null}
                      size="small"
                      label="Mentor"
                      variant="outlined"
                    />
                  )}
                />
              )}
              {individuals && individuals.individuals && (
                <Autocomplete
                  className={classes.input}
                  options={individuals.individuals}
                  onChange={(event, newValue) => {
                    setValue("user", newValue as Individual);
                  }}
                  renderOption={(option) => (
                    <>
                      <Avatar
                        src={option.user.avatar}
                        className={classes.avatar}
                      />
                      {`${option.firstName} ${option.lastName}`}
                    </>
                  )}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={errors.user ? true : false}
                      helperText={errors.user ? "Required" : null}
                      size="small"
                      label="User"
                      variant="outlined"
                    />
                  )}
                />
              )}
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  control={control}
                  name="date"
                  defaultValue={new Date()}
                  render={({ onChange, value }) => (
                    <DatePicker
                      className={classes.input}
                      label="Date"
                      inputVariant="outlined"
                      animateYearScrolling
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
              >
                Save
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
