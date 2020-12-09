import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  useDeleteMentorMutation,
  useMentorQuery,
} from "../../../../../generated/graphql";
import { Loading } from "../../../../shared/loading/Loading";
import { DeleteEntityCard } from "../../../deleteEntityCard/DeleteEntityCard";
import { PageTitle } from "../../../pageTitle/PageTitle";

interface MentorDetailsProps {}

export const MentorDetails: React.FC<MentorDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();

  let history = useHistory();

  const { data, loading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });
  const [deleteMentor] = useDeleteMentorMutation();

  const handleDelete = async () => {
    const { data } = await deleteMentor({
      variables: { mentorId: parseInt(id) },
    });
    if (data?.deleteMentor.deleted) {
      history.goBack();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Mentor Details" />
      {data && (
        <DeleteEntityCard
          userEmail={data.mentor.info.user.email}
          avatar={data.mentor.info.user.avatar || ""}
          name={`${data.mentor.info.firstName} ${data.mentor.info.lastName}`}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
