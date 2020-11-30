import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  FieldError,
  RegisterInput,
  useRegisterAdminMutation,
} from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 150,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface RegisterAdminProps {}

export const RegisterAdmin: React.FC<RegisterAdminProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const [errors, setErrors] = useState<FieldError>();

  const { register, handleSubmit } = useForm<RegisterInput>();

  const [adminRegister, { loading }] = useRegisterAdminMutation();

  const onSubmit = async (formData: RegisterInput) => {
    const { data } = await adminRegister({ variables: { options: formData } });

    if (data?.registerAdmin.errors) {
      setErrors(data.registerAdmin.errors[0]);
    } else if (data?.registerAdmin.user) {
      history.push("/login");
    }
    console.log(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          className={classes.logo}
          src={process.env.PUBLIC_URL + "/logo1blue512.png"}
          alt=""
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                error={errors?.field === "firstName" ? true : false}
                helperText={
                  errors?.field === "firstName" ? errors.message : null
                }
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={register}
                error={errors?.field === "lastName" ? true : false}
                helperText={
                  errors?.field === "lastName" ? errors.message : null
                }
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                error={errors?.field === "email" ? true : false}
                helperText={errors?.field === "email" ? errors.message : null}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                error={errors?.field === "password" ? true : false}
                helperText={
                  errors?.field === "password" ? errors.message : null
                }
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
