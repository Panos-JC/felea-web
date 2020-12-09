import React from "react";
import { useCertificatesQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../shared/generalCard/GeneralCard";
import { Loading } from "../../../../../shared/loading/Loading";
import { Certificate } from "./Certificate";

interface CertificateListProps {
  id: number;
}

export const CertificateList: React.FC<CertificateListProps> = ({ id }) => {
  const { data, loading } = useCertificatesQuery({
    variables: { mentorId: id },
  });
  return (
    <GeneralCard title="Certificates">
      {loading ? (
        <Loading />
      ) : (
        data?.certificates.data?.map((certificate) => (
          <Certificate id={id} values={certificate} />
        ))
      )}
    </GeneralCard>
  );
};
