import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { MentorInfoCard } from "../components/MentorProfile/MentorInfoCard";
import { WorkExperienceList } from "../components/MentorProfile/WorkExperienceList";
import { useMentorQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import { Bio } from "../components/MentorProfile/Bio";

// const useStyles = makeStyles((theme) => ({

// }));

interface MentorProfilePublicProps {}

export const MentorProfilePublic: React.FC<MentorProfilePublicProps> = () => {
  // const classes = useStyles();

  // get mentor id from url
  const { id } = useParams<any>();

  const { data, loading } = useMentorQuery({
    variables: { mentorId: parseInt(id) },
  });

  return (
    <Layout maxWidth="sm">
      <MentorInfoCard
        loading={loading}
        firstName={data?.mentor?.firstName}
        lastName={data?.mentor?.lastName}
        avatar={data?.mentor?.user.avatar}
        title={data?.mentor?.title}
        rate={data?.mentor.rate}
        location={data?.mentor.location}
        languages={data?.mentor.languages}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Bio editable={false} bio={data?.mentor.bio} />
      )}
      <WorkExperienceList editable={false} id={parseInt(id)} />
    </Layout>
  );
};
