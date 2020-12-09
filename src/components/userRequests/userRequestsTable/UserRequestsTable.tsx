import {
  makeStyles,
  fade,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Link,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIndividualRequestsQuery } from "../../../generated/graphql";
import { SessionTag } from "../../dashboard/sessions/sessionTag/SessionTag";
import { Loading } from "../../shared/loading/Loading";

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
}));

interface UserRequestsTableProps {}

export const UserRequestsTable: React.FC<UserRequestsTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useIndividualRequestsQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Mentor</TableCell>
          <TableCell>Subject</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Ammount</TableCell>
          <TableCell>Date Created</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.individualRequests.data?.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.id}</TableCell>
            <TableCell>
              <div className={classes.nameCell}>
                <Avatar
                  className={classes.avatar}
                  src={request.mentor.user.avatar || ""}
                />
                <div>
                  <Link
                    className={classes.link}
                    color="inherit"
                    component={RouterLink}
                    to="/management/customers/1"
                    variant="h6"
                  >
                    {`${request.mentor.firstName} ${request.mentor.lastName}`}
                  </Link>
                </div>
              </div>
            </TableCell>
            <TableCell>{request.headline}</TableCell>
            <TableCell>
              <SessionTag status={request.status} />
            </TableCell>
            <TableCell>&euro;{request.ammount / 100}</TableCell>
            <TableCell>
              {moment(new Date(parseInt(request.createdAt))).format(
                "MMMM Do YYYY"
              )}
            </TableCell>
            <TableCell align="right">
              <Link
                className={classes.link}
                color="inherit"
                component={RouterLink}
                to={`/user/requests/${request.id}`}
                variant="h6"
              >
                <IconButton size="small" color="primary">
                  <ArrowForward />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
