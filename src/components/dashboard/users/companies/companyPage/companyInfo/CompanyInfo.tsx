import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CompanyFragment } from "../../../../../../generated/graphql";

interface CompanyInfoProps {
  data: CompanyFragment;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ data }) => {
  return (
    <Card>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Name</Typography>
            </TableCell>
            <TableCell>{data.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Accounts Baught</Typography>
            </TableCell>
            <TableCell>{data.boughtAccounts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Remaining Accounts</Typography>
            </TableCell>
            <TableCell>{data.remainingAccounts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Code</Typography>
            </TableCell>
            <TableCell>{data.code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Created by</Typography>
            </TableCell>
            <TableCell>{`${data.admin.firstName} ${data.admin.lastName}`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
