import {
  makeStyles,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FieldError,
  MeDocument,
  useLoginMutation,
} from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
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
      data.login.user.mentor ? history.push(`/mentor/${data.login.user.mentor.id}`) : history.push(`/mentors`);
      
    }
    console.log("RESPONSE ", data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
              <Link to="#">Forgot password?</Link>
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
