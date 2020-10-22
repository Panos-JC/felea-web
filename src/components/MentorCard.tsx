import classes from "*.module.css";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Divider,
  Chip,
  makeStyles,
} from "@material-ui/core";
import { StarBorder } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    marginBottom: 20,
  },
  headerWrapper: {
    display: "flex",
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  headerInfo: {
    display: "flex",
  },
  infoItem: {
    fontSize: "75%",
    color: theme.palette.text.secondary,
    marginRight: 15,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
  action: {
    marginBottom: 10,
  },
  stats: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.primary,
    "& span": {
      fontSize: 13,
      color: theme.palette.text.secondary,
      marginLeft: 5,
    },
  },
  bio: {
    color: theme.palette.text.secondary,
    margin: "10px 0",
  },
  skills: {},
  skill: {
    margin: 5,
  },
  link: {
    textDecoration: "none",
  },
}));

interface MentorCardProps {
  mentorId: number;
  firstName: string;
  lastName: string;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentorId,
  firstName,
  lastName,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.headerWrapper}>
        <Avatar className={classes.avatar} />
        <div className={classes.header}>
          <Typography variant="h5">
            {firstName} {lastName}
          </Typography>
          <Typography variant="caption">Digital Marketer</Typography>

          <div className={classes.headerInfo}>
            <Typography className={classes.infoItem}>Athens, Greece</Typography>
            <Typography className={classes.infoItem}>Greek, English</Typography>
          </div>
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.action}
            color="primary"
            size="small"
            variant="contained"
            disableElevation
          >
            Contanct
          </Button>
          <Link to={`/mentor/${mentorId}`} className={classes.link}>
            <Button
              className={classes.action}
              color="primary"
              size="small"
              variant="outlined"
            >
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <Divider />
      <div className={classes.stats}>
        <div className={classes.stat}>
          <strong>&euro;50</strong>
          <span>/ h</span>
        </div>
        <div className={classes.stat}>
          <strong>23</strong>
          <span>sessions</span>
        </div>
        <div className={classes.stat}>
          <strong>4.9</strong>
          <StarBorder color="primary" />
        </div>
      </div>
      <Divider />
      <div>
        <Typography className={classes.bio} variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          repudiandae voluptatem aliquid iure nisi nulla voluptas aperiam
          expedita illum ab sint neque molestias distinctio minus nesciunt
          nostrum quibusdam deleniti laudantium...
        </Typography>
        <div className={classes.skills}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Chip
              key={item}
              size="small"
              className={classes.skill}
              label={`Skill ${item}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
