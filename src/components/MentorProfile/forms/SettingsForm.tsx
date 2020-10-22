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
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MeDocument,
  useMeQuery,
  useSetMentorDetailsMutation,
} from "../../../generated/graphql";
import { LoadingButton } from "../../loadingButton/LoadingButton";

const useStyles = makeStyles((theme) => ({
  settings: {
    padding: 20,
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
  location: string;
  languages: string;
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
  const { register, handleSubmit, errors } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log("formData ", formData);
    const { errors, data } = await setMentorDetails({
      variables: { options: { ...formData } },
      refetchQueries: [{ query: MeDocument }],
    });

    // handle snackbar
    if (errors) {
      console.log(errors);
    } else if (data?.setMentorDetails.error) {
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSnackbarMsg(data?.setMentorDetails.error.message);
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
                Location
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                inputRef={register({ required: true })}
                error={errors.location ? true : false}
                helperText={errors.location ? "Required field" : null}
                defaultValue={data?.me?.mentor?.location}
                name="location"
                label="Location"
                placeholder="Athens, Greece"
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
          <LoadingButton
            type="submit"
            disableElevation
            loading={userDetailsLoading}
            text="Save"
          />
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
