import {
  makeStyles,
  Table,
  Link,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  fade,
  CircularProgress,
} from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSessionsQuery } from "../../../generated/graphql";
import moment from "moment";

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

interface SessionsTableProps {}

export const SessionsTable: React.FC<SessionsTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useSessionsQuery();

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
          <TableCell>Id</TableCell>
          <TableCell>Mentor</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Created by</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.sessions &&
          data.sessions.map((session) => (
            <TableRow hover key={session.id}>
              <TableCell>{session.id}</TableCell>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    className={classes.avatar}
                    src={session.mentor.user.avatar}
                  />
                  <div>
                    <Link
                      className={classes.link}
                      color="inherit"
                      component={RouterLink}
                      to="/management/customers/1"
                      variant="h6"
                    >
                      {`${session.mentor.firstName} ${session.mentor.lastName}`}
                    </Link>
                    <div className={classes.email}>
                      {session.mentor.user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    className={classes.avatar}
                    src={session.mentor.user.avatar}
                  />
                  <div>
                    <Link
                      className={classes.link}
                      color="inherit"
                      component={RouterLink}
                      to="/management/customers/1"
                      variant="h6"
                    >
                      {`${session.individual.firstName} ${session.individual.lastName}`}
                    </Link>
                    <div className={classes.email}>
                      {session.individual.user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {moment(session.date).format("MMMM Do YYYY")}
              </TableCell>
              <TableCell>{`${session.creator.firstName} ${session.creator.lastName}`}</TableCell>
              <TableCell align="right">
                <IconButton size="small" color="secondary">
                  <ArrowForwardIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
