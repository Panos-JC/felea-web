import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  GetMentorInfoDocument,
  useGetMentorInfoQuery,
  useSetMentorDetailsByAdminMutation,
} from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../shared/generalCard/GeneralCard";
import { Loading } from "../../../../../shared/loading/Loading";

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
  location: string;
  languages: string;
};

type Severity = "success" | "error" | "warning" | "info";

interface GeneralInfoProps {
  id: number;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = ({ id }) => {
  const classes = useStyles();

  // state
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>("success");

  const { register, handleSubmit, errors } = useForm<Inputs>();

  const { data, loading: infoLoading } = useGetMentorInfoQuery({
    variables: { mentorId: id },
  });
  const [setMentorDetails, { loading }] = useSetMentorDetailsByAdminMutation();
  console.log("data ", data);

  const onSubmit = async (formData: Inputs) => {
    // const { errors, data } = await setMentorDetails({
    //   variables: { options: { ...formData }, mentorId: id },
    //   refetchQueries: [
    //     { query: GetMentorInfoDocument, variables: { mentorId: id } },
    //   ],
    // });
    // // handle snackbar
    // if (errors) {
    //   console.log(errors);
    // } else if (data?.setMentorDetailsByAdmin.errorMsg) {
    //   setSnackbarSeverity("error");
    //   setSnackbarOpen(true);
    //   setSnackbarMsg(data?.setMentorDetailsByAdmin.errorMsg);
    // } else if (data?.setMentorDetailsByAdmin.mentor) {
    //   setSnackbarSeverity("success");
    //   setSnackbarOpen(true);
    //   setSnackbarMsg("Details updated");
    // }
  };

  if (infoLoading) {
    return <Loading />;
  }

  return (
    <GeneralCard title="General Info">
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
                defaultValue={data?.getMentorInfo?.mentor?.title}
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
                    defaultValue={data?.getMentorInfo?.mentor?.firstName}
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
                    defaultValue={data?.getMentorInfo?.mentor?.lastName}
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
                  defaultValue={data?.getMentorInfo?.mentor?.rate}
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
                // defaultValue={data?.getMentorInfo?.mentor?.location}
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
                defaultValue={data?.getMentorInfo?.mentor?.languages}
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
            disabled={loading}
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
    </GeneralCard>
  );
};
