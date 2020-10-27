import {
  makeStyles,
  Avatar,
  Card,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { Layout } from "../layout/Layout";
import { Link as RouterLink } from "react-router-dom";
import { ArrowForward } from "@material-ui/icons";
import { useMentorSessionsQuery } from "../../generated/graphql";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 500,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  link: {
    fontSize: 14,
  },
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

interface SessionsProps {}

export const Sessions: React.FC<SessionsProps> = () => {
  const classes = useStyles();

  const { data, loading } = useMentorSessionsQuery();

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Layout maxWidth="md">
      <Card className={classes.card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Mentor</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.mentorSessions &&
              data.mentorSessions.map((session) => (
                <TableRow hover key={session.id}>
                  <TableCell>#{session.id}</TableCell>
                  <TableCell>
                    <div className={classes.nameCell}>
                      <Avatar className={classes.avatar} />
                      {`${session.mentor.firstName} ${session.mentor.lastName}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={classes.nameCell}>
                      <Avatar className={classes.avatar} />
                      {`${session.individual.firstName} ${session.individual.lastName}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    {moment(session.date).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    <RouterLink to={`/sessions/${session.id}`}>
                      <IconButton size="small" color="secondary">
                        <ArrowForward />
                      </IconButton>
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Layout>
  );
};
