import {
  makeStyles,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  FieldError,
  RegisterInput,
  useRegisterIndividualMutation,
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
  code: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  code?: string;
};

interface RegisterIndividualProps {}

export const RegisterIndividual: React.FC<RegisterIndividualProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  // State
  const [errors, setErrors] = useState<FieldError>();
  const [showPassword, setShowPassword] = useState(false);

  // GraphQL
  const [registerIndividual, { loading }] = useRegisterIndividualMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const options: RegisterInput = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      repeatPassword: formData.repeatPassword,
      code: formData.code,
    };

    const { data: response } = await registerIndividual({
      variables: { options },
    });

    if (response?.registerIndividual.errors) {
      setErrors(response.registerIndividual.errors[0]);
    }

    if (response && response.registerIndividual.user) {
      history.push("/login");
    }
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
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  error={errors?.field === "password" ? true : false}
                  inputRef={register}
                  name="password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {errors?.field === "password" && (
                  <Typography variant="caption" color="error">
                    {errors.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password2">
                  Repeat Password
                </InputLabel>
                <OutlinedInput
                  error={errors?.field === "repeatPassword" ? true : false}
                  inputRef={register}
                  name="repeatPassword"
                  id="outlined-adornment-password2"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={125}
                />
                {errors?.field === "repeatPassword" && (
                  <Typography variant="caption" color="error">
                    {errors.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors?.field === "code" ? true : false}
                helperText={
                  errors?.field === "code"
                    ? errors.message
                    : "(Optional): Fill the 10 digit code if you are part of an organization"
                }
                className={classes.code}
                inputRef={register}
                variant="outlined"
                fullWidth
                id="code"
                label="Code"
                name="code"
                autoComplete="off"
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
