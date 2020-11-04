import React from "react";
import { Layout } from "../layout/Layout";
import { Bio } from "./bio/Bio";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { WorkExperienceList } from "./workExperience/WorkExperienceList";
import { useExpertisesQuery, useMeQuery } from "../../generated/graphql";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ReviewsList } from "./reviews/ReviewsList";
import { Loading } from "../loading/Loading";

interface MentorProfilePrivateProps {}

export const MentorProfilePrivate: React.FC<MentorProfilePrivateProps> = () => {
  // GraphQl
  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: experiencesData,
    loading: experiencesLoading,
  } = useExpertisesQuery();

  return (
    <Layout maxWidth="md">
      {meLoading ? (
        <Loading />
      ) : (
        meData &&
        meData.me &&
        meData.me.mentor &&
        experiencesData &&
        experiencesData.expertises && (
          <>
            <MentorInfoCard
              loading={meLoading}
              firstName={meData.me.mentor.firstName}
              lastName={meData.me.mentor.lastName}
              avatar={meData.me.avatar}
              title={meData.me.mentor.title}
              rate={meData.me.mentor.rate}
              location={meData.me.mentor.location}
              languages={meData.me.mentor.languages}
              facebookLink={meData.me.mentor.facebook}
              instagramLink={meData.me.mentor.instagram}
              linkedinLink={meData.me.mentor.linkedin}
              mediumLink={meData.me.mentor.medium}
              twitterLink={meData.me.mentor.twitter}
            />
            <Bio editable={true} bio={meData.me.mentor.bio} />
            <ExpertiseList
              data={experiencesData.expertises}
              loading={experiencesLoading}
              editable
            />
            <WorkExperienceList editable={true} id={meData.me.mentor.id} />
            <ReviewsList id={meData.me.mentor.id} />
          </>
        )
      )}
    </Layout>
  );
};
