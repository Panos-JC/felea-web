import {
  makeStyles,
  CssBaseline,
  Toolbar,
  Drawer,
  List,
} from "@material-ui/core";
import React from "react";
import { NavBar } from "../../navbar/NavBar";
import { DashboardRoutes } from "../dashboardRoutes/DashboardRoutes";
import { SessionsDrawerItem } from "./drawerItems/SessionsDrawerItem";
import { TagsDrawerItem } from "./drawerItems/TagsDrawerItem";
import { UsersDrawerItem } from "./drawerItems/UsersDrawerItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const classes = useStyles();

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
            <SessionsDrawerItem />
            <UsersDrawerItem />
            <TagsDrawerItem />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

        <DashboardRoutes />
      </main>
    </div>
  );
};
