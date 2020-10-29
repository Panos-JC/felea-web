import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import React from "react";

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
  title: {
    marginBottom: 25,
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 150,
  },
}));

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.title} component="h1" variant="h5">
          Sign up
        </Typography>
        <Link to="/admin-register" className={classes.link}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            As Admin
          </Button>
        </Link>
        <Link to="/mentor-register" className={classes.link}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            As Mentor
          </Button>
        </Link>
        <Link to="/guest-register" className={classes.link}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            As Guest
          </Button>
        </Link>
      </div>
    </Container>
  );
};
