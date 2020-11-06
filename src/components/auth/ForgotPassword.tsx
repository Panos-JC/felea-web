import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 500,
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: 65,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%",
  },
  input: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(1),
  },
}));

type Inputs = {
  email: string;
};

interface ForgotPasswordProps {}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const classes = useStyles();

  const [sent, setSent] = useState<boolean>(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    await forgotPassword({ variables: { email: formData.email } });
    setSent(true);
  };

  return (
    <div className={classes.wrapper}>
      {sent ? (
        <Card className={classes.card}>
          <CheckCircleOutline className={classes.icon} />
          <Typography>Email has been sent.</Typography>
          <Link to="/login">Login</Link>
        </Card>
      ) : (
        <Card className={classes.card}>
          <Typography variant="h6">Enter your email</Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className={classes.input}
              inputRef={register}
              variant="outlined"
              name="email"
              label="Email"
              size="small"
            />
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Send
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};
