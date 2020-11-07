import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useCompaniesQuery } from "../../../../generated/graphql";
import { Loading } from "../../../loading/Loading";

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
  link: {
    fontSize: 14,
  },
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface CompanyTableProps {}

export const CompanyTable: React.FC<CompanyTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useCompaniesQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Accounts Bought</TableCell>
          <TableCell>Active accounts</TableCell>
          <TableCell>Code</TableCell>
          <TableCell>Created By</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.companies &&
          data.companies.map((company) => (
            <TableRow hover>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.boughtAccounts}</TableCell>
              <TableCell>
                {company.boughtAccounts - company.remainingAccounts}
              </TableCell>
              <TableCell>{company.code}</TableCell>
              <TableCell>{`${company.admin.firstName} ${company.admin.lastName}`}</TableCell>
              <TableCell>
                {moment(new Date(parseInt(company.createdAt))).format(
                  "MMM Do YY"
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" color="secondary">
                  <ArrowForward />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
