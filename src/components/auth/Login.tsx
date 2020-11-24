import {
  makeStyles,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FieldError,
  MeDocument,
  useLoginMutation,
} from "../../generated/graphql";
import { Alert } from "@material-ui/lab";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface loginProps {}

export const Login: React.FC<loginProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const [login, { loading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldError>();

  const handleChange = (event: any) => {
    event.target.name === "email"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { data } = await login({
      variables: { email, password },
      refetchQueries: [{ query: MeDocument }],
    });

    if (data?.login.errors) {
      setErrors(data.login.errors[0]);
    } else if (data?.login.user) {
      data.login.user.mentor
        ? history.push("/profile")
        : history.push("/mentors");
      if (data.login.user.mentor) {
        history.push("/profile");
      } else if (data.login.user.individual) {
        history.push("/mentors");
      } else if (data.login.user.admin) {
        history.push("/dashboard");
      }
    }
    console.log("RESPONSE ", data);
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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          {errors?.field === "general" && (
            <Alert severity="error" variant="filled">
              {errors.message}
            </Alert>
          )}

          <TextField
            error={errors?.field === "email" ? true : false}
            helperText={errors?.field === "email" ? errors.message : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={errors?.field === "password" ? true : false}
            helperText={errors?.field === "password" ? errors.message : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChange}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
