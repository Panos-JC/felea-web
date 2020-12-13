import { Card } from "@material-ui/core";
import React from "react";
import { useAdminsQuery } from "../../../../generated/graphql";
import { Loading } from "../../../shared/loading/Loading";
import { PageTitle } from "../../pageTitle/PageTitle";
import { AssignFacilitatorDialog } from "./assignFacilitatorDialog/AssignFacilitatorDialog";
import { UserTable } from "./UserTable";

interface IndividualsProps {}

export const Individuals: React.FC<IndividualsProps> = () => {
  const { data, loading } = useAdminsQuery();

  return (
    <>
      <PageTitle title="Individuals" />
      <Card>
        <UserTable />
      </Card>
      {loading || !data ? (
        <Loading />
      ) : (
        <AssignFacilitatorDialog admins={data.admins} />
      )}
    </>
  );
};
