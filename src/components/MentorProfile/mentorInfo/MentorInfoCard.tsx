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
import {
  RiLinkedinBoxLine,
  RiMediumLine,
  RiFacebookBoxLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";
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
    fontSize: 25,
    color: theme.palette.text.secondary,
  },
}));

interface MentorInfoCardProps {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  title?: string | null;
  rate?: string | null;
  location?: string | null;
  languages?: string | null;
  loading: boolean;
  facebookLink?: string | null | undefined;
  instagramLink?: string | null | undefined;
  twitterLink?: string | null | undefined;
  mediumLink?: string | null | undefined;
  linkedinLink?: string | null | undefined;
}

export const MentorInfoCard: React.FC<MentorInfoCardProps> = ({
  firstName,
  lastName,
  avatar,
  title,
  rate,
  location,
  languages,
  loading,
  facebookLink,
  instagramLink,
  twitterLink,
  mediumLink,
  linkedinLink,
}) => {
  const classes = useStyles();

  if (loading) return <div>Loading...</div>;

  return (
    <Card className={classes.card}>
      <div className={classes.cardHead}>
        <Avatar className={classes.avatar} src={avatar}></Avatar>
        <Typography className={classes.title} variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography className={classes.subtitle} variant="caption">
          {title}
        </Typography>
      </div>
      <div className={classes.infoSmall}>
        <div className={classes.titleSmall}>{location}</div>
        <div className={classes.titleSmall}>{languages}</div>
      </div>
      <div className={classes.cardBody}>
        <div className={classes.stats}>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              {rate} &euro;
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
            {mediumLink && (
              <a href={mediumLink}>
                <RiMediumLine className={classes.icon} />
              </a>
            )}

            {facebookLink && (
              <a href={facebookLink}>
                <RiFacebookBoxLine className={classes.icon} />
              </a>
            )}

            {twitterLink && (
              <a href={twitterLink}>
                <RiTwitterLine className={classes.icon} />
              </a>
            )}

            {instagramLink && (
              <a href={instagramLink}>
                <RiInstagramLine className={classes.icon} />
              </a>
            )}
            {linkedinLink && (
              <a href={linkedinLink}>
                <RiLinkedinBoxLine className={classes.icon} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
