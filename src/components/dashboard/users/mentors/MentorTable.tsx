import {
  Avatar,
  CircularProgress,
  IconButton,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAllMentorsQuery } from "../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  warn: {
    background: fade(theme.palette.error.light, 0.4),
    color: theme.palette.error.dark,
  },
  success: {
    background: fade(theme.palette.success.light, 0.4),
    color: theme.palette.success.dark,
  },
  link: {
    fontSize: 14,
  },
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

interface MentorTableProps {}

export const MentorTable: React.FC<MentorTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useAllMentorsQuery();

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Sessions</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.allMentors &&
          data.allMentors.map((mentor) => (
            <TableRow hover key={mentor.mentor.id}>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    className={classes.avatar}
                    src={mentor.mentor.user.avatar || ""}
                  />
                  <div>
                    <Link
                      className={classes.link}
                      color="inherit"
                      component={RouterLink}
                      to="/management/customers/1"
                      variant="h6"
                    >
                      {`${mentor.mentor.firstName} ${mentor.mentor.lastName}`}
                    </Link>
                    <div className={classes.email}>
                      {mentor.mentor.user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{mentor.sessions}</TableCell>
              <TableCell align="right">
                <IconButton size="small" color="primary">
                  <ArrowForwardIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
