import {
  makeStyles,
  ListItem,
  Button,
  Collapse,
  List,
} from "@material-ui/core";
import {
  PeopleOutline,
  ExpandLess,
  ExpandMore,
  PersonOutlineOutlined,
  Business,
} from "@material-ui/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  navLink: {
    width: "100%",
    textDecoration: "none",
  },
  active: {
    "& .MuiButton-root": {
      color: theme.palette.primary.main,
    },
  },
  btnText: {
    marginRight: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface UsersDrawerItemProps {}

export const UsersDrawerItem: React.FC<UsersDrawerItemProps> = () => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState(false);

  return (
    <>
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
    </>
  );
};
