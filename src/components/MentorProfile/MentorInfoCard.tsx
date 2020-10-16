import {
  makeStyles,
  Avatar,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import {
  GradeOutlined,
  MicNoneOutlined,
  VideocamOutlined,
} from "@material-ui/icons";
import { Twitter, Linkedin, Facebook } from "react-feather";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 25,
  },
  cardHead: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  title: {},
  subtitle: {
    color: theme.palette.text.secondary,
  },
  infoSmall: {
    display: "flex",
    textAlign: "center",
    justifyContent: "space-around",
  },
  titleSmall: {
    fontSize: 12,
    color: theme.palette.secondary.light,
    margin: "5px 15px",
  },
  cardBody: {},
  stats: {
    display: "flex",
    textAlign: "center",
    justifyContent: "space-around",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    margin: "0 20px",
  },
  stat: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  actionButtonContainer: {
    flexGrow: 1,
  },
  icons: {},
  icon: {
    marginRight: 5,
  },
}));

interface MentorInfoCardProps {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export const MentorInfoCard: React.FC<MentorInfoCardProps> = ({
  firstName,
  lastName,
  avatar,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.cardHead}>
        <Avatar className={classes.avatar} src={avatar}></Avatar>
        <Typography className={classes.title} variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography className={classes.subtitle} variant="caption">
          Digital Strategist & Trainer
        </Typography>
      </div>
      <div className={classes.infoSmall}>
        <div className={classes.titleSmall}>Athens, Greece</div>
        <div className={classes.titleSmall}>Greek, English</div>
      </div>
      <div className={classes.cardBody}>
        <div className={classes.stats}>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              150 &euro;
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Hourly Rate
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              <MicNoneOutlined />
              <VideocamOutlined />
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Availability
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              23
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Sessionss
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              4.97
              <GradeOutlined color="primary" />
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Rating
            </Typography>
          </span>
        </div>
        <div className={classes.actions}>
          <div className={classes.actionButtonContainer}>
            <Button variant="contained" color="primary" disableElevation>
              Contact
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              variant="outlined"
              color="primary"
              disableElevation
            >
              Reviews
            </Button>
          </div>

          <div className={classes.icons}>
            <Facebook className={classes.icon} />
            <Twitter className={classes.icon} />
            <Linkedin className={classes.icon} />
          </div>
        </div>
      </div>
    </Card>
  );
};
