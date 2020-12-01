import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";
import {
  AccountCircle,
  Dashboard,
  FolderOpen,
  PowerSettingsNew,
  Settings,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navigation: {
    display: "inline-flex",
    marginRight: 15,
  },
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  button: {
    textTransform: "none",
    fontSize: 16,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  imgWrapper: {
    flexGrow: 1,
  },
  logo: {
    width: 150,
  },
}));

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const history = useHistory();

  const { data } = useMeQuery();
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
        <>
          <Link to="/user/requests" className={classes.link}>
            <Button
              className={classes.menuButton}
              color="primary"
              variant="contained"
              disableElevation
            >
              My Requests
            </Button>
          </Link>
          <Link to="/mentors" className={classes.link}>
            <Button
              className={classes.menuButton}
              color="primary"
              variant="contained"
              disableElevation
            >
              Browse Mentors
            </Button>
          </Link>
        </>
      )}

      {data?.me?.admin && (
        <>
          <Link to="/dashboard" className={classes.link}>
            <Button
              className={classes.menuButton}
              color="primary"
              variant="contained"
              startIcon={<Dashboard />}
              disableElevation
            >
              Dashboard
            </Button>
          </Link>
        </>
      )}

      {data?.me?.mentor && (
        <div className={classes.navigation}>
          <Link to="/requests" className={classes.link}>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              startIcon={<FolderOpen />}
              disableElevation
            >
              Requests
            </Button>
          </Link>
        </div>
      )}

      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
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
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <Link className={classes.link} to="/profile">
              Profile
            </Link>
          </MenuItem>
        )}
        {data?.me?.mentor && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <Link className={classes.link} to={`/setings/profile`}>
              Settings
            </Link>
          </MenuItem>
        )}
        {data?.me?.individual && (
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <Link className={classes.link} to={`/setings`}>
              Settings
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <AppBar elevation={2} position="static" color="primary">
      <Toolbar>
        <div className={classes.imgWrapper}>
          <img
            className={classes.logo}
            src={process.env.PUBLIC_URL + "/logo2silver.png"}
            alt=""
          />
        </div>

        {data && data.me ? body : <Button>Login</Button>}
      </Toolbar>
    </AppBar>
  );
};
