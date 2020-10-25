import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../../pageTitle/PageTitle";
import { AdminTable } from "./AdminTable";

interface AdminsProps {}

export const Admins: React.FC<AdminsProps> = () => {
  return (
    <>
      <PageTitle title="Admins" />
      <Card>
        <AdminTable />
      </Card>
    </>
  );
};
