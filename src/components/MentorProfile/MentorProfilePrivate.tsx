import React from "react";
import { Layout } from "../layout/Layout";
import { Bio } from "./bio/Bio";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { WorkExperienceList } from "./workExperience/WorkExperienceList";
import {
  useExpertisesQuery,
  useLoggedInMentorQuery,
} from "../../generated/graphql";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ReviewsList } from "./reviews/ReviewsList";
import { Loading } from "../loading/Loading";

interface MentorProfilePrivateProps {}

export const MentorProfilePrivate: React.FC<MentorProfilePrivateProps> = () => {
  // GraphQl
  const { data, loading } = useLoggedInMentorQuery();
  const {
    data: experiencesData,
    loading: experiencesLoading,
  } = useExpertisesQuery();

  return (
    <Layout maxWidth="md">
      {loading ? (
        <Loading />
      ) : (
        data &&
        data.loggedInMentor &&
        experiencesData &&
        experiencesData.expertises && (
          <>
            <MentorInfoCard
              firstName={data.loggedInMentor.info.firstName}
              lastName={data.loggedInMentor.info.lastName}
              avatar={data.loggedInMentor.info.user.avatar}
              title={data.loggedInMentor.info.title}
              rate={data.loggedInMentor.info.rate}
              location={data.loggedInMentor.info.location}
              languages={data.loggedInMentor.info.languages}
              facebookLink={data.loggedInMentor.info.facebook}
              instagramLink={data.loggedInMentor.info.instagram}
              linkedinLink={data.loggedInMentor.info.linkedin}
              mediumLink={data.loggedInMentor.info.medium}
              twitterLink={data.loggedInMentor.info.twitter}
              sessions={data.loggedInMentor.sessionCount}
              rating={data.loggedInMentor.avg}
            />
            <Bio editable={true} bio={data.loggedInMentor.info.bio} />
            <ExpertiseList
              data={experiencesData.expertises}
              loading={experiencesLoading}
              editable
            />
            <WorkExperienceList
              editable={true}
              id={data.loggedInMentor.info.id}
            />
            <ReviewsList id={data.loggedInMentor.info.id} />
          </>
        )
      )}
    </Layout>
  );
};
