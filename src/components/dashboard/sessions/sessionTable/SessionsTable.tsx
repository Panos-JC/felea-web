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
import moment from "moment";
import { useSessionRequestsQuery } from "../../../../generated/graphql";
import { SessionTag } from "../sessionTag/SessionTag";

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
  successChip: {
    backgroundColor: fade(theme.palette.success.light, 0.5),
    color: theme.palette.success.dark,
  },
  warnChip: {
    backgroundColor: fade(theme.palette.warning.light, 0.5),
    color: theme.palette.warning.dark,
  },
  errorChip: {
    backgroundColor: fade(theme.palette.error.light, 0.5),
    color: theme.palette.error.dark,
  },
  completeChip: {
    backgroundColor: fade(theme.palette.secondary.light, 0.5),
    color: theme.palette.secondary.dark,
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

  const { data, loading } = useSessionRequestsQuery();

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
          <TableCell>Status</TableCell>
          <TableCell>Ammount</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.sessionRequests &&
          data.sessionRequests.map((session) => (
            <TableRow hover key={session.id}>
              <TableCell>{session.id}</TableCell>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    className={classes.avatar}
                    src={session.mentor.user.avatar || ""}
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
                    src={session.individual.user.avatar || ""}
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
                <SessionTag status={session.status} />
              </TableCell>
              <TableCell>{session.ammount / 100}&euro;</TableCell>
              <TableCell>
                {moment(new Date(parseInt(session.createdAt))).format(
                  "MMMM Do YYYY"
                )}
              </TableCell>
              <TableCell align="right">
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to={`/dashboard/sessions/${session.id}`}
                  variant="h6"
                >
                  <IconButton size="small" color="secondary">
                    <ArrowForwardIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
