import {
  Card,
  Avatar,
  Typography,
  Button,
  Divider,
  Chip,
  makeStyles,
} from "@material-ui/core";
import { LocationOnOutlined, StarBorder } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import {
  Industry,
  Maybe,
  Mentor,
  MentorsResponse,
  Skill,
  Users,
} from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    marginBottom: 20,
  },
  headerWrapper: {
    display: "flex",
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  headerInfo: {
    display: "flex",
    marginTop: theme.spacing(2),
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "75%",
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(4),
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
  locationIcon: {
    color: theme.palette.grey["300"],
  },
}));

interface MentorCardProps {
  mentor: { __typename?: "MentorsResponse" } & Pick<
    MentorsResponse,
    "avg" | "sessions"
  > & {
      mentor: { __typename?: "Mentor" } & Pick<
        Mentor,
        | "id"
        | "firstName"
        | "lastName"
        | "title"
        | "location"
        | "languages"
        | "bio"
        | "rate"
      > & {
          user: { __typename?: "Users" } & Pick<Users, "avatar" | "email">;
          expertises: Array<
            { __typename?: "Expertise" } & {
              skill: { __typename?: "Skill" } & Pick<Skill, "name">;
            }
          >;
          workExperience: Array<
            { __typename?: "WorkExperience" } & {
              industries?: Maybe<
                Array<{ __typename?: "Industry" } & Pick<Industry, "name">>
              >;
            }
          >;
        };
    };
}

export const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.headerWrapper}>
        <Avatar
          className={classes.avatar}
          src={mentor.mentor.user.avatar || ""}
        />
        <div className={classes.header}>
          <Typography variant="h5">
            {mentor.mentor.firstName} {mentor.mentor.lastName}
          </Typography>

          {mentor.mentor.title && (
            <Typography variant="caption">{mentor.mentor.title}</Typography>
          )}

          <div className={classes.headerInfo}>
            <Typography className={classes.infoItem}>
              <LocationOnOutlined className={classes.locationIcon} />
              {mentor.mentor.location}
            </Typography>
            <Typography className={classes.infoItem}>
              {mentor.mentor.languages}
            </Typography>
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
          <Link to={`/mentor/${mentor.mentor.id}`} className={classes.link}>
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
          <strong>&euro;{mentor.mentor.rate || "_"}</strong>
          <span>/ h</span>
        </div>
        <div className={classes.stat}>
          <strong>{mentor.sessions}</strong>
          <span>sessions</span>
        </div>
        <div className={classes.stat}>
          <strong>{mentor.avg || "_"}</strong>
          <StarBorder color="primary" />
        </div>
      </div>
      <Divider />
      <div>
        <Typography className={classes.bio} variant="body2">
          {mentor.mentor.bio && mentor.mentor.bio.slice(0, 245)}...
        </Typography>
        <div className={classes.skills}>
          {mentor.mentor.expertises &&
            mentor.mentor.expertises.map((expertise, index) => (
              <Chip
                key={index}
                size="small"
                className={classes.skill}
                label={expertise.skill.name}
              />
            ))}
        </div>
      </div>
    </Card>
  );
};
