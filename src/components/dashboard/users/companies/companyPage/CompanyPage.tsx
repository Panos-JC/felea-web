import { Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useCompanyQuery } from "../../../../../generated/graphql";
import { Loading } from "../../../../shared/loading/Loading";
import { DeleteCompanyCard } from "../../../deleteCard/DeleteCompanyCard";
import { PageTitle } from "../../../pageTitle/PageTitle";
import { CompanyInfo } from "./companyInfo/CompanyInfo";
import { Employees } from "./employees/Employees";

interface CompanyPageProps {}

export const CompanyPage: React.FC<CompanyPageProps> = () => {
  const { id } = useParams<{ id: string }>();
  const idNum = parseInt(id);

  const { data, loading, error } = useCompanyQuery({
    variables: { companyId: idNum },
  });

  // loading state
  if (loading) {
    return <Loading />;
  }

  // error state
  if (error || !data || !data.company.company) {
    if (data?.company.errorMsg) {
      return <div>{data.company.errorMsg}</div>;
    } else {
      return <div>Error</div>;
    }
  }

  return (
    <>
      <PageTitle title="Company" />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CompanyInfo data={data.company.company} />
        </Grid>
        <Grid item xs={8}>
          <Employees companyId={idNum} />
        </Grid>
        <Grid item xs={12}>
          <DeleteCompanyCard
            companyName={data.company.company.name}
            companyId={idNum}
          />
        </Grid>
      </Grid>
    </>
  );
};
