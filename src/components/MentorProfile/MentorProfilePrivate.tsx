import React from "react";
import { Layout } from "../layout/Layout";
import { Bio } from "./bio/Bio";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { WorkExperienceList } from "./workExperience/WorkExperienceList";
import { useMeQuery } from "../../generated/graphql";
import { ExpertiseList } from "./expertise/ExpertiseList";

interface MentorProfilePrivateProps {}

export const MentorProfilePrivate: React.FC<MentorProfilePrivateProps> = () => {
  const { data, loading } = useMeQuery();

  return (
    <Layout maxWidth="sm">
      {loading ? (
        <div>Loading...</div>
      ) : (
        data &&
        data.me &&
        data.me.mentor && (
          <>
            <MentorInfoCard
              loading={loading}
              firstName={data.me.mentor.firstName}
              lastName={data.me.mentor.lastName}
              avatar={data.me.avatar}
              title={data.me.mentor.title}
              rate={data.me.mentor.rate}
              location={data.me.mentor.location}
              languages={data.me.mentor.languages}
            />
            <Bio editable={true} bio={data.me.mentor.bio} />
            <ExpertiseList mentorId={data.me.mentor.id} />
            <WorkExperienceList editable={true} id={data.me.mentor.id} />
          </>
        )
      )}
    </Layout>
  );
};
