import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const history = useHistory();

  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    history.push("/login");
  };

  const body = (
    <div>
      {data?.me?.individual && (
        <Link to="/mentors" className={classes.link}>
          <Button
            className={classes.menuButton}
            color="primary"
            variant="outlined"
          >
            Browse Mentors
          </Button>
        </Link>
      )}

      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="default"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {data?.me?.mentor && (
          <MenuItem onClick={handleClose}>
            <Link className={classes.link} to="/profile">
              Profile
            </Link>
          </MenuItem>
        )}
        {data?.me?.mentor && (
          <MenuItem onClick={handleClose}>
            <Link className={classes.link} to={`/setings/profile`}>
              Settings
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );

  return (
    <AppBar elevation={2} position="static" color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Felea
        </Typography>
        {data?.me ? body : <Button>Login</Button>}
      </Toolbar>
    </AppBar>
  );
};
