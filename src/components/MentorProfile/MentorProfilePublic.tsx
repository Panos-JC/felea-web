import React from "react";
import { Layout } from "../layout/Layout";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { WorkExperienceList } from "./workExperience/WorkExperienceList";
import {
  useExpertisesByIdQuery,
  useMentorQuery,
} from "../../generated/graphql";
import { useParams } from "react-router-dom";
import { Bio } from "./bio/Bio";
import { ReviewsList } from "./reviews/ReviewsList";
import { Loading } from "../loading/Loading";
import { ExpertiseList } from "./expertise/ExpertiseList";

interface MentorProfilePublicProps {}

export const MentorProfilePublic: React.FC<MentorProfilePublicProps> = () => {
  // get mentor id from url
  const { id } = useParams<any>();

  // GraphQL
  const { data: mentorData, loading: mentorLoading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });
  const { data } = useExpertisesByIdQuery({
    variables: { mentorId: parseInt(id) },
  });

  return (
    <Layout maxWidth="md">
      {mentorLoading ? (
        <Loading />
      ) : (
        mentorData &&
        mentorData.mentor &&
        data &&
        data.expertisesById && (
          <>
            <MentorInfoCard
              firstName={mentorData.mentor.info.firstName}
              lastName={mentorData.mentor.info.lastName}
              avatar={mentorData.mentor.info.user.avatar}
              title={mentorData.mentor.info.title}
              rate={mentorData.mentor.info.rate}
              location={mentorData.mentor.info.location}
              languages={mentorData.mentor.info.languages}
              sessions={mentorData.mentor.sessionCount}
              rating={mentorData.mentor.avg}
            />
            <Bio editable={false} bio={mentorData.mentor.info.bio} />
            <ExpertiseList data={data.expertisesById} />
            <WorkExperienceList editable={false} id={parseInt(id)} />
            <ReviewsList id={parseInt(id)} />
          </>
        )
      )}
    </Layout>
  );
};
