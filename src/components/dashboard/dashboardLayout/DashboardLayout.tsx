import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Button,
  Collapse,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import {
  PeopleOutline,
  FolderOutlined,
  ExpandLess,
  ExpandMore,
  PersonOutlineOutlined,
  Business,
  Settings as SettingsIcon,
  PowerSettingsNew,
} from "@material-ui/icons";
import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../../../generated/graphql";
import { ProtectedRoute } from "../../../router/ProtectedRoute";
import { SessionPage } from "../sessions/sessionPage/SessionPage";
import { Sessions } from "../sessions/Sessions";
import { Admins } from "../users/admins/Admins";
import { Companies } from "../users/companies/Companies";
import { NewCompany } from "../users/companies/newCompany/NewCompany";
import { Individuals } from "../users/individuals/Individuals";
import { Mentors } from "../users/mentors/Mentors";
import { NewMentor } from "../users/mentors/newMentor/NewMentor";
import { Settings } from "../settings/Settings";
import { NewAdmin } from "../users/admins/newAdmin/NewAdmin";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.background.paper,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  li: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  button: {
    width: "100%",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
    textTransform: "none",
  },
  btnText: {
    marginRight: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  navLink: {
    width: "100%",
    textDecoration: "none",
  },
  active: {
    "& .MuiButton-root": {
      color: theme.palette.primary.main,
    },
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  navBtn: {
    color: theme.palette.primary.contrastText,
    textTransform: "none",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Remote state
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  // History
  const history = useHistory();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Felea | Dashboard
          </Typography>
          {!loading && data && data.me && data.me.admin && (
            <Button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(event.currentTarget)
              }
              className={classes.navBtn}
              color="secondary"
              endIcon={
                <Avatar src={data.me.avatar || ""} className={classes.avatar} />
              }
            >
              Hi {data.me.admin.firstName}
            </Button>
          )}
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
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link className={classes.link} to={`/dashboard/settings`}>
                Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem className={classes.li}>
              <NavLink
                to="/dashboard/sessions"
                className={classes.navLink}
                activeClassName={classes.active}
              >
                <Button
                  className={classes.button}
                  size="large"
                  startIcon={<FolderOutlined />}
                >
                  Sessions
                </Button>
              </NavLink>
            </ListItem>
            <ListItem className={classes.li}>
              <Button
                onClick={() => setOpen(!open)}
                className={classes.button}
                size="large"
                startIcon={<PeopleOutline />}
                endIcon={open ? <ExpandLess /> : <ExpandMore />}
              >
                {/* <FolderOutlined className={classes.icon} /> */}
                <span className={classes.btnText}>Users</span>
              </Button>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem className={`${classes.li} ${classes.nested}`}>
                  <NavLink
                    to="/dashboard/users/mentors"
                    className={classes.navLink}
                    activeClassName={classes.active}
                  >
                    <Button
                      className={classes.button}
                      size="large"
                      startIcon={<PersonOutlineOutlined />}
                    >
                      Mentors
                    </Button>
                  </NavLink>
                </ListItem>
                <ListItem className={`${classes.li} ${classes.nested}`}>
                  <NavLink
                    to="/dashboard/users/individuals"
                    className={classes.navLink}
                    activeClassName={classes.active}
                  >
                    <Button
                      className={classes.button}
                      size="large"
                      startIcon={<PersonOutlineOutlined />}
                    >
                      Individuals
                    </Button>
                  </NavLink>
                </ListItem>
                <ListItem className={`${classes.li} ${classes.nested}`}>
                  <NavLink
                    to="/dashboard/users/admins"
                    className={classes.navLink}
                    activeClassName={classes.active}
                  >
                    <Button
                      className={classes.button}
                      size="large"
                      startIcon={<PersonOutlineOutlined />}
                    >
                      Admins
                    </Button>
                  </NavLink>
                </ListItem>
                <ListItem className={`${classes.li} ${classes.nested}`}>
                  <NavLink
                    to="/dashboard/users/companies"
                    className={classes.navLink}
                    activeClassName={classes.active}
                  >
                    <Button
                      className={classes.button}
                      size="large"
                      startIcon={<Business />}
                    >
                      Companies
                    </Button>
                  </NavLink>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <ProtectedRoute path="/dashboard/settings" component={Settings} exact />
        <ProtectedRoute
          path="/dashboard/users/mentors"
          component={Mentors}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/mentors/new"
          component={NewMentor}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/admins/new"
          component={NewAdmin}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/individuals"
          component={Individuals}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/admins"
          component={Admins}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/companies"
          component={Companies}
          exact
        />
        <ProtectedRoute
          path="/dashboard/users/companies/new"
          component={NewCompany}
          exact
        />
        <ProtectedRoute path="/dashboard/sessions" component={Sessions} exact />
        <ProtectedRoute
          path="/dashboard/sessions/:id"
          component={SessionPage}
          exact
        />

        {children}
      </main>
    </div>
  );
};
