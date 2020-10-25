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
} from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

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

export const SessionsTable: React.FC<SessionsTableProps> = ({}) => {
  const classes = useStyles();
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
        <TableRow hover>
          <TableCell>1</TableCell>
          <TableCell>
            <div className={classes.nameCell}>
              <Avatar className={classes.avatar}>JD</Avatar>
              <div>
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to="/management/customers/1"
                  variant="h6"
                >
                  First Name
                </Link>
                <div className={classes.email}>email</div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className={classes.nameCell}>
              <Avatar className={classes.avatar}>JD</Avatar>
              <div>
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to="/management/customers/1"
                  variant="h6"
                >
                  First Name
                </Link>
                <div className={classes.email}>email</div>
              </div>
            </div>
          </TableCell>
          <TableCell>date</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell align="right">
            <IconButton size="small" color="secondary">
              <ArrowForwardIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
