import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useDeleteIndividualMutation,
  useIndividualQuery,
} from "../../../../../generated/graphql";
import { Loading } from "../../../../shared/loading/Loading";
import { DeleteEntityCard } from "../../../deleteEntityCard/DeleteEntityCard";
import { PageTitle } from "../../../pageTitle/PageTitle";

interface IndividualPageProps {}

export const IndividualPage: React.FC<IndividualPageProps> = () => {
  let history = useHistory();

  const { id } = useParams<{ id: string }>();

  // GraphQL
  const { data, loading } = useIndividualQuery({
    variables: { individualId: parseInt(id) },
  });
  const [deleteIndividual] = useDeleteIndividualMutation();

  const handleDelete = async () => {
    const { data } = await deleteIndividual({
      variables: { individualId: parseInt(id) },
    });

    if (data?.deleteIndividual.deleted) {
      history.goBack();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Individual" />
      {data && (
        <DeleteEntityCard
          userEmail={data.individual.user.email}
          avatar={data.individual.user.avatar || ""}
          name={`${data.individual.firstName} ${data.individual.lastName}`}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
