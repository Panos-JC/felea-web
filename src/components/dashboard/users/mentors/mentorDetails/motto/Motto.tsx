import React from "react";
import { useGetMottoQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../generalCard/GeneralCard";
import { Loading } from "../../../../../loading/Loading";

interface MottoProps {
  id: number;
}

export const Motto: React.FC<MottoProps> = ({ id }) => {
  const { data, loading } = useGetMottoQuery({ variables: { mentorId: id } });
  return (
    <GeneralCard title="Motto">
      {loading ? <Loading /> : data?.getMotto.result}
    </GeneralCard>
  );
};
