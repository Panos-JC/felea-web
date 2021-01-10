import { useApolloClient } from "@apollo/client";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
} from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { AdminMenu } from "./admin/AdminMenu";
import { AdminNav } from "./admin/AdminNav";
import { IndividualMenu } from "./individual/IndividualMenu";
import { IndividualNav } from "./individual/IndividualNav";
import { MentorMenu } from "./mentor/MentorMenu";
import { MentorNav } from "./mentor/MentorNav";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  navigation: {
    display: "inline-flex",
    marginRight: 15,
  },
  avatar: {
    width: 25,
    height: 25,
  },
  button: {
    textTransform: "none",
    fontSize: 16,
  },
  avatarButton: {
    textTransform: "none",
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

  const client = useApolloClient();

  const [name, setName] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const history = useHistory();

  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (data?.me?.admin) {
      setName(data.me.admin.firstName);
    }

    if (data?.me?.mentor) {
      setName(data.me.mentor.firstName);
    }

    if (data?.me?.individual) {
      setName(data.me.individual.firstName);
    }
  }, [data]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    logout();
    await client.cache.reset();
    setAnchorEl(null);
    history.push("/login");
  };

  const body = (
    <div>
      {data?.me?.individual && <IndividualNav />}

      {data?.me?.mentor && <MentorNav />}

      {data?.me?.admin && <AdminNav />}
      <Button
        className={classes.avatarButton}
        variant="contained"
        color="primary"
        onClick={handleMenu}
        size="small"
        disableElevation
        startIcon={
          <Avatar className={classes.avatar} src={data?.me?.avatar || ""} />
        }
      >
        Hi, {name}
      </Button>
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
        {data?.me?.mentor && <MentorMenu handleClose={handleClose} />}
        {data?.me?.individual && <IndividualMenu handleClose={handleClose} />}
        {data?.me?.admin && <AdminMenu handleClose={handleClose} />}
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
    <AppBar
      elevation={2}
      position="fixed"
      color="primary"
      className={classes.appBar}
    >
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
