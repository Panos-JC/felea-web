import MomentUtils from "@date-io/moment";
import {
  Card,
  Typography,
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  makeStyles,
  Snackbar,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  IsProfileCompleteDocument,
  MeDocument,
  MentorDetailsInput,
  useMeQuery,
  useSetMentorDetailsMutation,
} from "../../../generated/graphql";
import { countries } from "../../../utils/countries";

const useStyles = makeStyles((theme) => ({
  settings: {
    padding: 20,
    marginBottom: theme.spacing(2),
  },
  group: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
  },
  title: {
    display: "flex",
    fontSize: 14,
    alignItems: "center",
  },
  formControl: {
    width: "100%",
    margin: 0,
  },
  input: {
    width: "100%",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
  },
  smallText: {
    fontSize: "11px",
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
}));

type Inputs = {
  title: string;
  firstName: string;
  lastName: string;
  rate: string;
  country: string;
  city: string;
  languages: string;
  timeFrom: Date;
  timeUntill: Date;
  dayFrom: string;
  dayUntill: string;
};

type Severity = "success" | "error" | "warning" | "info";

interface SettingsFormProps {}

export const SettingsForm: React.FC<SettingsFormProps> = () => {
  const classes = useStyles();

  // state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>("success");

  // Queries
  const { data, loading } = useMeQuery();

  // Mutations
  const [
    setMentorDetails,
    { loading: userDetailsLoading },
  ] = useSetMentorDetailsMutation();

  // handle form
  const { register, handleSubmit, errors, control } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    const options: MentorDetailsInput = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: formData.title,
      rate: formData.rate,
      country: formData.country,
      city: formData.city,
      languages: formData.languages,
      availableTimeFrom: formData.timeFrom,
      availableTimeUntill: formData.timeUntill,
      availableDayFrom: formData.dayFrom,
      availableDayUntill: formData.dayUntill,
    };
    const { errors, data } = await setMentorDetails({
      variables: { options },
      refetchQueries: [
        { query: MeDocument },
        { query: IsProfileCompleteDocument },
      ],
    });
    // handle snackbar
    if (errors) {
      console.log(errors);
    } else if (data?.setMentorDetails.errorMsg) {
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSnackbarMsg(data?.setMentorDetails.errorMsg);
    } else if (data?.setMentorDetails.mentor) {
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSnackbarMsg("Details updated");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card className={classes.settings}>
      <Typography variant="h5" component="h2">
        Profile Settings
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                inputRef={register({ required: true })}
                error={errors.title ? true : false}
                helperText={errors.title ? "Required field" : null}
                defaultValue={data?.me?.mentor?.title}
                name="title"
                label="Title"
                variant="outlined"
                size="small"
                className={classes.input}
              />
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Your name
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register({ required: true })}
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName ? "Required field" : null}
                    defaultValue={data?.me?.mentor?.firstName}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    className={classes.input}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register({ required: true })}
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName ? "Required field" : null}
                    defaultValue={data?.me?.mentor?.lastName}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    className={classes.input}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Hourly Rate
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  inputRef={register({ required: true })}
                  error={errors.lastName ? true : false}
                  defaultValue={data?.me?.mentor?.rate}
                  // helperText={errors.lastName ? "Required field" : null}
                  name="rate"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      &euro; / hour
                    </InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Days Available
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControl
                    size="small"
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Available From
                    </InputLabel>
                    <Controller
                      control={control}
                      name="dayFrom"
                      defaultValue={
                        data?.me?.mentor?.availableDayFrom || "Monday"
                      }
                      render={({ onChange, value }) => (
                        <Select
                          label="Available From"
                          value={value}
                          onChange={onChange}
                        >
                          <MenuItem value={"Monday"}>Monday</MenuItem>
                          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                          <MenuItem value={"Thursday"}>Thursday</MenuItem>
                          <MenuItem value={"Friday"}>Friday</MenuItem>
                          <MenuItem value={"Saturday"}>Saturday</MenuItem>
                          <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    size="small"
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Available Untill
                    </InputLabel>
                    <Controller
                      control={control}
                      name="dayUntill"
                      defaultValue={
                        data?.me?.mentor?.availableDayUntill || "Friday"
                      }
                      render={({ onChange, value }) => (
                        <Select
                          label="Available Untill"
                          value={value}
                          onChange={onChange}
                        >
                          <MenuItem value={"Monday"}>Monday</MenuItem>
                          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                          <MenuItem value={"Thursday"}>Thursday</MenuItem>
                          <MenuItem value={"Friday"}>Friday</MenuItem>
                          <MenuItem value={"Saturday"}>Saturday</MenuItem>
                          <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Hours Available
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Controller
                      control={control}
                      name="timeFrom"
                      defaultValue={
                        new Date(data?.me?.mentor?.availableTimeFrom)
                      }
                      render={({ onChange, value }) => (
                        <TimePicker
                          showTodayButton
                          todayLabel="now"
                          label="From"
                          value={value}
                          minutesStep={5}
                          onChange={onChange}
                          size="small"
                          inputVariant="outlined"
                        />
                      )}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Controller
                      control={control}
                      name="timeUntill"
                      defaultValue={
                        new Date(data?.me?.mentor?.availableTimeUntill)
                      }
                      render={({ onChange, value }) => (
                        <TimePicker
                          showTodayButton
                          todayLabel="now"
                          label="Untill"
                          value={value}
                          minutesStep={5}
                          onChange={onChange}
                          size="small"
                          inputVariant="outlined"
                        />
                      )}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4} className={classes.flexCenter}>
              <Typography variant="h6" className={classes.title}>
                Location
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Controller
                    name="country"
                    as={({ onChange }) => (
                      <Autocomplete
                        options={countries}
                        onChange={(_, data) => onChange(data?.name)}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => {
                          return option.name === value.name;
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    )}
                    control={control}
                    defaultValue={data?.me?.mentor?.country}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register({ required: true })}
                    error={errors.city ? true : false}
                    helperText={errors.city ? "Required field" : null}
                    defaultValue={data?.me?.mentor?.city}
                    name="city"
                    label="City"
                    placeholder="e.g Athens"
                    variant="outlined"
                    size="small"
                    className={classes.input}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.title}>
                Languages
              </Typography>
              <Typography className={classes.smallText}>
                Please list the languages you speak fluently and would feel
                comfortable mentoring in.
              </Typography>
            </Grid>
            <Grid item xs={8} className={classes.flexCenter}>
              <TextField
                inputRef={register({ required: true })}
                error={errors.languages ? true : false}
                helperText={errors.languages ? "Required field" : null}
                defaultValue={data?.me?.mentor?.languages}
                name="languages"
                label="Languages"
                placeholder="Greek, English"
                variant="outlined"
                size="small"
                className={classes.input}
              />
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={classes.group}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={userDetailsLoading}
            disableElevation
          >
            Save
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Card>
  );
};
