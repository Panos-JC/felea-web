import {
  ListItem,
  Button,
  Collapse,
  List,
  makeStyles,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, LabelOutlined } from "@material-ui/icons";
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

interface TagsDrawerItemProps {}

export const TagsDrawerItem: React.FC<TagsDrawerItemProps> = () => {
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
          startIcon={<LabelOutlined />}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
        >
          <span className={classes.btnText}>Tags</span>
        </Button>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={`${classes.li} ${classes.nested}`}>
            <NavLink
              to="/dashboard/tags/skills"
              className={classes.navLink}
              activeClassName={classes.active}
            >
              <Button
                className={classes.button}
                size="large"
                startIcon={<LabelOutlined />}
              >
                Skills
              </Button>
            </NavLink>
          </ListItem>
          <ListItem className={`${classes.li} ${classes.nested}`}>
            <NavLink
              to="/dashboard/tags/industries"
              className={classes.navLink}
              activeClassName={classes.active}
            >
              <Button
                className={classes.button}
                size="large"
                startIcon={<LabelOutlined />}
              >
                Industries
              </Button>
            </NavLink>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
