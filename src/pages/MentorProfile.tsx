import React from "react";
import { Layout } from "../components/Layout";
import { MentorInfoCard } from "../components/MentorProfile/MentorInfoCard";
import { Experience } from "../components/MentorProfile/WorkExperienceList";
import { useMentorQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import { Bio } from "../components/MentorProfile/Bio";

// const useStyles = makeStyles((theme) => ({

// }));

interface MentorProfileProps {}

export const MentorProfile: React.FC<MentorProfileProps> = () => {
  // const classes = useStyles();

  // get mentor id from url
  const { id } = useParams<any>();

  const { data, loading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });

  return (
    <Layout maxWidth="sm">
      {!loading && (
        <MentorInfoCard
          firstName={data?.mentor?.firstName}
          lastName={data?.mentor?.lastName}
          avatar={data?.mentor?.user.avatar}
        />
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Bio bio={data?.mentor.bio} mentorId={parseInt(id)} />
      )}
      <Experience id={parseInt(id)} />
    </Layout>
  );
};
