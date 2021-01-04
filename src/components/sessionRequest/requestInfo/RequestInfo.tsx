import MomentUtils from "@date-io/moment";
import {
  Avatar,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import {
  IndividualRequestsDocument,
  SessionRequestInput,
  useCreateSessionRequestMutation,
  useMentorQuery,
  useMeQuery,
} from "../../../generated/graphql";
import { Loading } from "../../shared/loading/Loading";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  mentorSection: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    background: theme.palette.background.default,
    // justifyContent: "space-between",
    marginBottom: theme.spacing(6),
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },
  select: {
    width: 400,
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  messgeField: {
    marginTop: theme.spacing(3),
  },
  actionBtn: {
    marginTop: theme.spacing(2),
  },
  dateInput: {
    width: "100%",
  },
}));

const reasons = [
  "To learn more about their provided services",
  "Because their expertise matches my needs.",
  "Because I need urgent support.",
  "Other",
];

type Inputs = {
  objective: string;
  subject: string;
  other?: string;
  email: string;
  tool: string;
  id: string;
  message: string;
  date1: Date;
  date2: Date;
  date3: Date;
};

interface ParamTypes {
  id: string;
}

interface RequestInfoProps {}

export const RequestInfo: React.FC<RequestInfoProps> = () => {
  const classes = useStyles();

  // Router
  const { id } = useParams<ParamTypes>();
  const history = useHistory();

  // GraphQL
  const { data: meData, loading: meLoading } = useMeQuery();
  const { data, loading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });
  const [
    createSessionRequest,
    { loading: sessionRequestLoading },
  ] = useCreateSessionRequestMutation();

  // Form Handler
  const { register, handleSubmit, control, errors, watch } = useForm<Inputs>();

  const watchObjective = watch("objective");

  const newDate = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);

    return date;
  };

  const onSubmit = async (formData: Inputs) => {
    let objective = formData.objective;

    if (formData.objective === "Other" && formData.other) {
      objective = formData.other;
    }

    // Send token to the server
    const input: SessionRequestInput = {
      objective: objective,
      headline: formData.subject,
      email: formData.email,
      communicationTool: formData.tool,
      communicationToolId: formData.id,
      suggestedDate1: formData.date1,
      suggestedDate2: formData.date2,
      suggestedDate3: formData.date3,
      message: formData.message,
      ammount: parseInt(data?.mentor.info.rate!) * 100, // Amount in cents
      mentorId: parseInt(id),
    };

    console.log(input);

    const { data: sessionData } = await createSessionRequest({
      variables: { input },
      refetchQueries: [{ query: IndividualRequestsDocument }],
    });

    if (sessionData && sessionData.createSessionRequest.sessionRequest) {
      history.push("/user/requests");
    }
  };

  if (loading || meLoading) {
    return <Loading />;
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Card className={classes.card}>
          <Typography variant="h5" className={classes.title}>
            Schedule a meeting
          </Typography>
          {data && data.mentor && (
            <div className={classes.mentorSection}>
              <Avatar
                className={classes.avatar}
                src={data.mentor.info.user.avatar || ""}
              />
              <Typography variant="h6">
                {`${data.mentor.info.firstName} ${data.mentor.info.lastName}`}
              </Typography>
            </div>
          )}

          <div>
            <Typography variant="subtitle1">
              Why would you like to schedule a meeting with{" "}
              {data?.mentor.info.firstName}
            </Typography>
            <FormControl
              error={errors.objective ? true : false}
              variant="outlined"
              fullWidth
              size="small"
              className={classes.input}
            >
              <InputLabel>Select</InputLabel>
              <Controller
                as={
                  <Select label="Select">
                    {reasons.map((reason) => (
                      <MenuItem key={reason} value={reason}>
                        {reason}
                      </MenuItem>
                    ))}
                  </Select>
                }
                name="objective"
                control={control}
                rules={{ required: true }}
              />
              {errors.objective && (
                <Typography variant="caption" color="error">
                  This field is required
                </Typography>
              )}
            </FormControl>
          </div>

          {watchObjective === "Other" && (
            <TextField
              inputRef={register({ required: true })}
              className={classes.input}
              label="Other"
              name="other"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.other ? true : false}
              helperText={errors.other ? "This field is required" : null}
              placeholder={`Please, explain why you would like to schedule a meeting with ${data?.mentor.info.firstName}`}
            />
          )}

          <TextField
            inputRef={register({ required: true })}
            error={errors.subject ? true : false}
            helperText={errors.subject ? "This field is required" : null}
            className={classes.input}
            label="Subject"
            name="subject"
            variant="outlined"
            size="small"
            placeholder="e.g. HR recruiting"
            fullWidth
          />
          <TextField
            inputRef={register({ required: true })}
            error={errors.email ? true : false}
            helperText={errors.email ? "This field is required" : null}
            className={classes.input}
            label="Your Email"
            name="email"
            variant="outlined"
            size="small"
            fullWidth
            defaultValue={meData?.me?.email}
          />
          <Divider className={classes.input} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                inputRef={register({ required: true })}
                error={errors.id ? true : false}
                helperText={errors.id ? "This field is required" : null}
                label="Communication Tool"
                placeholder="e.g. Skype"
                name="tool"
                variant="outlined"
                fullWidth
                size="small"
              />
              <Typography variant="caption" className={classes.input}>
                How would you like to communicate with{" "}
                {data?.mentor.info.firstName}?
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register({ required: true })}
                error={errors.id ? true : false}
                helperText={errors.id ? "This field is required" : null}
                className={classes.input}
                label="Account Name or ID"
                placeholder="e.g. live:felea.org"
                name="id"
                variant="outlined"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Suggest Times When You're Free to Talk
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  name="date1"
                  control={control}
                  defaultValue={newDate}
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <DateTimePicker
                      error={errors.date1 ? true : false}
                      helperText={
                        errors.date1 ? "This field is required" : null
                      }
                      variant="inline"
                      size="small"
                      inputVariant="outlined"
                      disablePast
                      minutesStep={60}
                      views={["date", "hours"]}
                      value={value}
                      onChange={onChange}
                      className={classes.dateInput}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  error={errors.date2 ? true : false}
                  helperText={errors.date2 ? "This field is required" : null}
                  name="date2"
                  control={control}
                  defaultValue={newDate}
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <DateTimePicker
                      variant="inline"
                      size="small"
                      inputVariant="outlined"
                      disablePast
                      minutesStep={60}
                      views={["date", "hours"]}
                      value={value}
                      onChange={onChange}
                      className={classes.dateInput}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Controller
                  error={errors.date3 ? true : false}
                  helperText={errors.date3 ? "This field is required" : null}
                  name="date3"
                  control={control}
                  defaultValue={newDate}
                  rules={{ required: true }}
                  render={({ onChange, value }) => (
                    <DateTimePicker
                      variant="inline"
                      size="small"
                      inputVariant="outlined"
                      disablePast
                      minutesStep={60}
                      views={["date", "hours"]}
                      value={value}
                      onChange={onChange}
                      className={classes.dateInput}
                    />
                  )}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <TextField
            inputRef={register({ required: true })}
            error={errors.message ? true : false}
            helperText={errors.message ? "This field is required" : null}
            className={classes.messgeField}
            multiline
            placeholder="Use this space to introduce yourself and the challenges you are facing."
            rows={7}
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
          />
        </Card>
        <Button
          className={classes.actionBtn}
          disabled={sessionRequestLoading}
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
        >
          Send Request
        </Button>
      </form>
    </div>
  );
};
