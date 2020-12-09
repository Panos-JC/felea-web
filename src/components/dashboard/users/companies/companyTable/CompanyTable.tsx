import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { ArrowForward } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import { useCompaniesQuery } from "../../../../../generated/graphql";
import { Loading } from "../../../../shared/loading/Loading";

interface CompanyTableProps {}

export const CompanyTable: React.FC<CompanyTableProps> = () => {
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
            <TableRow hover key={company.id}>
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
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/dashboard/users/company/${company.id}`}
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
