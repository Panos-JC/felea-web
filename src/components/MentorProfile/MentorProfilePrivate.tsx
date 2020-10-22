import React from "react";
import { Layout } from "../layout/Layout";
import { Bio } from "./bio/Bio";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { WorkExperienceList } from "./workExperience/WorkExperienceList";
import { useMeQuery } from "../../generated/graphql";

interface MentorProfilePrivateProps {}

export const MentorProfilePrivate: React.FC<MentorProfilePrivateProps> = () => {
  const { data, loading } = useMeQuery();

  return (
    <Layout maxWidth="sm">
      <MentorInfoCard
        loading={loading}
        firstName={data?.me?.mentor?.firstName}
        lastName={data?.me?.mentor?.lastName}
        avatar={data?.me?.avatar}
        title={data?.me?.mentor?.title}
        rate={data?.me?.mentor?.rate}
        location={data?.me?.mentor?.location}
        languages={data?.me?.mentor?.languages}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Bio editable={true} bio={data?.me?.mentor?.bio} />
      )}
      <WorkExperienceList editable={true} id={data?.me?.mentor?.id!} />
    </Layout>
  );
};
