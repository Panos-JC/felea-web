import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Card,
} from "@material-ui/core";
import React from "react";
import { useEmployeesQuery } from "../../../../../../generated/graphql";
import { Loading } from "../../../../../shared/loading/Loading";

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
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface EmployeesProps {
  companyId: number;
}

export const Employees: React.FC<EmployeesProps> = ({ companyId }) => {
  const classes = useStyles();
  const { data, loading } = useEmployeesQuery({ variables: { companyId } });

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Session Requests</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.employees.data?.map((user) => (
            <TableRow hover key={user.id}>
              <TableCell>
                <div className={classes.nameCell}>
                  <Avatar
                    src={user.user.avatar || ""}
                    className={classes.avatar}
                  />
                  <div>
                    <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                    <div className={classes.email}>{user.user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Typography>{user.sessionRequestsCount}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
