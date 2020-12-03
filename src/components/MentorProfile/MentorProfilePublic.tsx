import React from "react";
import { Layout } from "../layout/Layout";
import { MentorInfoCard } from "./mentorInfo/MentorInfoCard";
import { Experience } from "./experience/Experience";
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
              mentorInfo={mentorData.mentor.info}
              avatar={mentorData.mentor.info.user.avatar}
              sessions={mentorData.mentor.sessionCount}
              rating={mentorData.mentor.avg}
            />
            <Bio editable={false} bio={mentorData.mentor.info.bio} />
            <ExpertiseList data={data.expertisesById} />
            <Experience editable={false} id={parseInt(id)} />
            <ReviewsList id={parseInt(id)} />
          </>
        )
      )}
    </Layout>
  );
};
