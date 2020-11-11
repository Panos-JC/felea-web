import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../../pageTitle/PageTitle";
import { UserTable } from "./UserTable";

interface IndividualsProps {}

export const Individuals: React.FC<IndividualsProps> = () => {
  return (
    <>
      <PageTitle title="Individuals" />
      <Card>
        <UserTable />
      </Card>
    </>
  );
};
