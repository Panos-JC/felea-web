import {
  makeStyles,
  CssBaseline,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Button,
  Collapse,
} from "@material-ui/core";
import {
  PeopleOutline,
  FolderOutlined,
  ExpandLess,
  ExpandMore,
  PersonOutlineOutlined,
  Business,
} from "@material-ui/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavBar } from "../../navbar/NavBar";
import { DashboardRoutes } from "../dashboardRoutes/DashboardRoutes";

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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
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

        <DashboardRoutes />

        {children}
      </main>
    </div>
  );
};
