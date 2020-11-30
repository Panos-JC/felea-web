import React from "react";
import { Layout } from "../layout/Layout";
import { Bio } from "./bio/Bio";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { Experience } from "./experience/Experience";
import {
  useExpertisesQuery,
  useIsProfileCompleteQuery,
  useLoggedInMentorQuery,
} from "../../generated/graphql";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ReviewsList } from "./reviews/ReviewsList";
import { Loading } from "../loading/Loading";
import { Alert } from "@material-ui/lab";
import { Motto } from "./motto/Motto";

interface MentorProfilePrivateProps {}

export const MentorProfilePrivate: React.FC<MentorProfilePrivateProps> = () => {
  // GraphQl
  const { data, loading } = useLoggedInMentorQuery();
  const {
    data: experiencesData,
    loading: experiencesLoading,
  } = useExpertisesQuery();
  const { data: profileCompleteData } = useIsProfileCompleteQuery();

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
            {profileCompleteData &&
              !profileCompleteData.isProfileComplete.isComplete && (
                <Alert
                  style={{ marginTop: 20 }}
                  severity="info"
                  variant="filled"
                  elevation={1}
                >
                  Your profile is not complete.
                  <ul>
                    {profileCompleteData.isProfileComplete.messages.map(
                      (message) => (
                        <li>{message}</li>
                      )
                    )}
                  </ul>
                </Alert>
              )}

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
            <Motto editable motto={data.loggedInMentor.info.motto} />
            <Bio editable={true} bio={data.loggedInMentor.info.bio} />
            <ExpertiseList
              data={experiencesData.expertises}
              loading={experiencesLoading}
              editable
            />
            <Experience editable={true} id={data.loggedInMentor.info.id} />
            <ReviewsList id={data.loggedInMentor.info.id} />
          </>
        )
      )}
    </Layout>
  );
};
