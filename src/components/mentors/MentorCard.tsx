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
import { convertFromRaw, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MentorInfoFragment, Skill } from "../../generated/graphql";

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
  mentor: MentorInfoFragment;
  avatar: string | null | undefined;
  sessions: number;
  rating: number | null | undefined;
  expertises: ({
    __typename?: "Expertise" | undefined;
  } & {
    __typename?: "Expertise" | undefined;
  } & {
    skill: {
      __typename?: "Skill" | undefined;
    } & Pick<Skill, "name">;
  })[];
}

export const MentorCard: React.FC<MentorCardProps> = ({
  mentor,
  avatar,
  sessions,
  rating,
  expertises,
}) => {
  const classes = useStyles();

  const [bio, setBio] = useState("");

  useEffect(() => {
    if (mentor.bio) {
      const rawContent = convertFromRaw(JSON.parse(mentor.bio));
      setBio(
        EditorState.createWithContent(rawContent)
          .getCurrentContent()
          .getPlainText()
      );
    }
  }, [mentor]);

  return (
    <Card className={classes.card}>
      <div className={classes.headerWrapper}>
        <Avatar className={classes.avatar} src={avatar || ""} />
        <div className={classes.header}>
          <Typography variant="h5">
            {mentor.firstName} {mentor.lastName}
          </Typography>

          {mentor.title && (
            <Typography variant="caption">{mentor.title}</Typography>
          )}

          <div className={classes.headerInfo}>
            <Typography className={classes.infoItem}>
              <LocationOnOutlined className={classes.locationIcon} />
              {`${mentor.city || ""}, ${mentor.country || ""}`}
            </Typography>
            <Typography className={classes.infoItem}>
              {mentor.languages}
            </Typography>
          </div>
        </div>
        <div className={classes.actions}>
          <Link to={`/mentor/${mentor.id}`} className={classes.link}>
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
          <strong>&euro;{mentor.rate || "_"}</strong>
          <span>/ h</span>
        </div>
        <div className={classes.stat}>
          <strong>{sessions}</strong>
          <span>sessions</span>
        </div>
        <div className={classes.stat}>
          {rating && <strong>{rating}</strong>}
          <StarBorder color="primary" />
        </div>
      </div>
      <Divider />
      <div>
        <Typography className={classes.bio} variant="body2">
          {bio && bio.slice(0, 245)}...
        </Typography>
        <div className={classes.skills}>
          {expertises.map((expertise, index) => (
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
