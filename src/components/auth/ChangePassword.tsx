import {
  Button,
  Card,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { FieldError, useChangePasswordMutation } from "../../generated/graphql";

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
  newPassword: string;
};

type Params = {
  token: string;
};

interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const classes = useStyles();

  const { token } = useParams<Params>();
  const history = useHistory();

  const [error, setError] = useState<FieldError>();

  const { register, handleSubmit } = useForm<Inputs>();

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const { data } = await changePassword({
      variables: { newPassword: formData.newPassword, token },
    });

    if (data && data.changePassword.errors) {
      setError(data.changePassword.errors[0]);
    } else if (data?.changePassword.user) {
      history.push("/login");
    }
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Typography variant="h6">Change password</Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={error?.field === "newPassword" ? true : false}
            helperText={error?.field === "newPassword" ? error?.message : null}
            className={classes.input}
            inputRef={register}
            variant="outlined"
            name="newPassword"
            label="New Password"
            type="password"
            size="small"
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};
