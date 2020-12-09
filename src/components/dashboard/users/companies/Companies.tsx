import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../../pageTitle/PageTitle";
import { CompanyTable } from "./companyTable/CompanyTable";

interface CompaniesProps {}

export const Companies: React.FC<CompaniesProps> = () => {
  return (
    <>
      <PageTitle
        title="Companies"
        action="Create Company"
        to="/dashboard/users/companies/new"
      />
      <Card>
        <CompanyTable />
      </Card>
    </>
  );
};
