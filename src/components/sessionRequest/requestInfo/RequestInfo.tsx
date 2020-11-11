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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import {
  SessionRequestInput,
  useCreateSessionRequestMutation,
  useExpertisesByIdQuery,
  useMentorQuery,
} from "../../../generated/graphql";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./styles.css";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: "#000",
      color: "#fff",
      fontWeight: "500",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",

      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#FFF",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};

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
    justifyContent: "space-between",
    marginBottom: theme.spacing(6),
  },
  avatar: {
    width: 60,
    height: 60,
  },
  select: {
    width: 300,
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  comInput: {
    width: 300,
  },
  actionBtn: {
    marginTop: theme.spacing(2),
  },
  creditCard: {
    maxWidth: 400,
  },
}));

type Inputs = {
  objective: string;
  headline: string;
  email: string;
  tool: string;
  id: string;
  message: string;
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

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // GraphQL
  const { data, loading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });
  const {
    data: expertisesData,
    loading: expertisesLoading,
  } = useExpertisesByIdQuery({ variables: { mentorId: parseInt(id) } });
  const [
    createSessionRequest,
    { data: sessionRequestData, loading: sessionRequestLoading },
  ] = useCreateSessionRequestMutation();

  // Form Handler
  const { register, handleSubmit, control, errors } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      // cardElement error.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      // Show error to customer
      console.log("[error]: ", error);
    } else {
      // Send token to the server
      const input: SessionRequestInput = {
        objective: formData.objective,
        headline: formData.headline,
        email: formData.email,
        communicationTool: formData.tool,
        communicationToolId: formData.id,
        message: formData.message,
        ammount: parseInt(data?.mentor.info.rate!) * 100, // Amount in cents
        mentorId: parseInt(id),
        token: paymentMethod!.id,
      };

      const { data: sessionData } = await createSessionRequest({
        variables: { input },
      });

      if (sessionData && sessionData.createSessionRequest.sessionRequest) {
        history.push("/new-request/success");
      }

      console.log("[paymentMethod]", paymentMethod);
      console.log("[sessionRequestData]", sessionData);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (data && data.mentor) {
    return (
      <div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Card className={classes.card}>
            <Typography variant="h5" className={classes.title}>
              Request Info
            </Typography>
            {data && data.mentor && (
              <div className={classes.mentorSection}>
                <Avatar
                  className={classes.avatar}
                  src={data.mentor.info.user.avatar || ""}
                />
                <div>
                  <Typography>Mentor</Typography>
                  <Typography variant="subtitle2">
                    {data.mentor.info.firstName}
                  </Typography>
                </div>
                <div>
                  <FormControl variant="outlined" className={classes.select}>
                    <InputLabel>Objective</InputLabel>
                    <Controller
                      as={
                        <Select label="Objective">
                          {expertisesData?.expertisesById.map((expertise) => (
                            <MenuItem
                              key={expertise.skill.name}
                              value={expertise.skill.name}
                            >
                              {expertise.skill.name}
                            </MenuItem>
                          ))}
                        </Select>
                      }
                      name="objective"
                      control={control}
                      defaultValue={
                        expertisesData?.expertisesById[0].skill.name
                      }
                    />
                  </FormControl>
                </div>
              </div>
            )}

            <TextField
              inputRef={register({ required: true })}
              error={errors.headline ? true : false}
              helperText={errors.headline ? "Required" : null}
              className={classes.input}
              label="Session Headline"
              name="headline"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              inputRef={register}
              className={classes.input}
              label="Your Email"
              name="email"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Divider className={classes.input} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.comInput}>
                  <InputLabel>Communication Tool</InputLabel>
                  <Controller
                    as={
                      <Select label="Communication Tool">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Skype"}>Skype</MenuItem>
                      </Select>
                    }
                    name="tool"
                    control={control}
                    defaultValue={"Skype"}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputRef={register}
                  className={classes.input}
                  label="ID"
                  name="id"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              inputRef={register}
              className={classes.input}
              multiline
              rows={7}
              label="Message"
              name="message"
              variant="outlined"
              fullWidth
              helperText="Use this space to introduce yourself and the challenges you are facing."
            />
          </Card>
          <Card className={classes.card} style={{ marginBottom: 50 }}>
            <Typography variant="h5" className={classes.title}>
              Payment Info
            </Typography>
            <CardElement
              options={CARD_OPTIONS}
              className={classes.creditCard}
            />
            <Typography variant="body2">
              You will be charged after your session is complete
            </Typography>
            <Button
              className={classes.actionBtn}
              disabled={!data.mentor.info.rate || sessionRequestLoading}
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Create Request
            </Button>
          </Card>
        </form>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};
