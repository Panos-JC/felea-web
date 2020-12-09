import React from "react";
import { useEducationsQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../shared/generalCard/GeneralCard";
import { Loading } from "../../../../../shared/loading/Loading";
import { Education } from "./Education";

interface EducationListProps {
  id: number;
}

export const EducationList: React.FC<EducationListProps> = ({ id }) => {
  const { data, loading } = useEducationsQuery({ variables: { mentorId: id } });
  return (
    <GeneralCard title="Academic Background">
      {loading ? (
        <Loading />
      ) : (
        data?.educations.data?.map((education) => (
          <Education values={education} id={id} />
        ))
      )}
    </GeneralCard>
  );
};
