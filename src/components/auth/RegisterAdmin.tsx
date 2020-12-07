import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  makeStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
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

  const { token } = useParams<{ token: string }>();

  // State
  const [errors, setErrors] = useState<FieldError>();
  const [showPassword, setShowPassword] = useState(false);

  // GraphQL
  const [adminRegister, { loading }] = useRegisterAdminMutation();

  const { register, handleSubmit } = useForm<RegisterInput>();

  const onSubmit = async (formData: RegisterInput) => {
    const { data } = await adminRegister({
      variables: { options: formData, token },
    });

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
            <Grid item xs={12}>
              {errors && errors.field === "token" && (
                <Alert severity="error" variant="filled">
                  {errors.message}
                </Alert>
              )}
            </Grid>
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
