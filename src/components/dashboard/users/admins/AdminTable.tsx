import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Avatar,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useAdminsQuery } from "../../../../generated/graphql";

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

interface AdminTableProps {}

export const AdminTable: React.FC<AdminTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useAdminsQuery();

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
          <TableCell>Active</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.admins &&
          data.admins.map((admin) => (
            <TableRow hover key={admin.id}>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    src={admin.user.avatar || ""}
                    className={classes.avatar}
                  >
                    JD
                  </Avatar>
                  <div>
                    <Link
                      className={classes.link}
                      color="inherit"
                      component={RouterLink}
                      to="/management/customers/1"
                      variant="h6"
                    >
                      {`${admin.firstName} ${admin.lastName}`}
                    </Link>
                    <div className={classes.email}>{admin.user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  label={admin.user.activated ? "True" : "False"}
                  size="small"
                  className={
                    admin.user.activated ? classes.success : classes.warn
                  }
                />
              </TableCell>
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
