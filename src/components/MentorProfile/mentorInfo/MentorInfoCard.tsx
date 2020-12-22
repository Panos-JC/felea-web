import {
  makeStyles,
  Avatar,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import { GradeOutlined, Language } from "@material-ui/icons";
import {
  RiLinkedinBoxLine,
  RiMediumLine,
  RiFacebookBoxLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";
import React from "react";
import { MentorInfoFragment, useMeQuery } from "../../../generated/graphql";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    color: theme.palette.text.secondary,
    margin: "5px 15px",
  },
  cardBody: {},
  stats: {
    display: "flex",
    textAlign: "center",
    alignItems: "flex-end",
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
  number: {
    fontWeight: "bold",
    fontSize: 13,
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
  link: {
    textDecoration: "none",
  },
}));

interface MentorInfoCardProps {
  rating: number | null | undefined;
  sessions: number;
  avatar?: string | null | undefined;
  mentorInfo: MentorInfoFragment;
}

interface ParamTypes {
  id: string;
}

export const MentorInfoCard: React.FC<MentorInfoCardProps> = ({
  mentorInfo,
  avatar,
  sessions,
  rating,
}) => {
  const classes = useStyles();

  const { id } = useParams<ParamTypes>();

  // GraphQL
  const { data } = useMeQuery();

  return (
    <Card className={classes.card}>
      <div className={classes.cardHead}>
        <Avatar className={classes.avatar} src={avatar || ""}></Avatar>
        <Typography className={classes.title} variant="h5">
          {`${mentorInfo.firstName} ${mentorInfo.lastName}`}
        </Typography>
        <Typography className={classes.subtitle} variant="caption">
          {mentorInfo.title}
        </Typography>
      </div>
      <div className={classes.infoSmall}>
        <div className={classes.titleSmall}>
          {mentorInfo.city &&
            mentorInfo.country &&
            `${mentorInfo.city}, ${mentorInfo.country}`}
        </div>
        <div className={classes.titleSmall}>{mentorInfo.languages}</div>
      </div>
      <div className={classes.cardBody}>
        <div className={classes.stats}>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              {mentorInfo.rate} &euro;
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Hourly Rate
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.number} variant="subtitle1">
              {`${mentorInfo.availableDayFrom?.slice(0, 3) || ""} - ${
                mentorInfo.availableDayUntill?.slice(0, 3) || ""
              }`}
            </Typography>

            <Typography className={classes.subtitle} variant="subtitle2">
              Days Available
            </Typography>
          </span>
          <span className={classes.stat}>
            <div>
              {mentorInfo.availableTimeFrom && mentorInfo.availableTimeUntill && (
                <Typography className={classes.number} variant="subtitle1">
                  {`${moment(new Date(mentorInfo.availableTimeFrom)).format(
                    "h:mm a"
                  )} - ${moment(
                    new Date(mentorInfo.availableTimeUntill)
                  ).format("h:mm a")}`}
                </Typography>
              )}
            </div>

            <Typography className={classes.subtitle} variant="subtitle2">
              Hours Available
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              {sessions}
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Sessions
            </Typography>
          </span>
          <span className={classes.stat}>
            <Typography className={classes.statNumber} variant="subtitle1">
              {rating || "_"}
              <GradeOutlined color="primary" />
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle2">
              Rating
            </Typography>
          </span>
        </div>
        <div className={classes.actions}>
          <div className={classes.actionButtonContainer}>
            {data?.me?.individual?.premium && (
              <Link to={`/mentor/${id}/new-request`} className={classes.link}>
                <Button variant="contained" color="primary" disableElevation>
                  Contact
                </Button>
              </Link>
            )}
          </div>

          <div className={classes.icons}>
            {mentorInfo.website && (
              <a href={mentorInfo.website}>
                <Language className={classes.icon} />
              </a>
            )}

            {mentorInfo.medium && (
              <a href={mentorInfo.medium}>
                <RiMediumLine className={classes.icon} />
              </a>
            )}

            {mentorInfo.facebook && (
              <a href={mentorInfo.facebook}>
                <RiFacebookBoxLine className={classes.icon} />
              </a>
            )}

            {mentorInfo.twitter && (
              <a href={mentorInfo.twitter}>
                <RiTwitterLine className={classes.icon} />
              </a>
            )}

            {mentorInfo.instagram && (
              <a href={mentorInfo.instagram}>
                <RiInstagramLine className={classes.icon} />
              </a>
            )}
            {mentorInfo.linkedin && (
              <a href={mentorInfo.linkedin}>
                <RiLinkedinBoxLine className={classes.icon} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
