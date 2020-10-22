// import { makeStyles } from "@material-ui/core";
import React from "react";
import { Layout } from "../components/Layout";
import { MentorCard } from "../components/MentorCard";
import { useMentorsQuery } from "../generated/graphql";

// const useStyles = makeStyles((theme) => ({}));

interface MentorsProps {}

export const Mentors: React.FC<MentorsProps> = () => {
  // const classes = useStyles();
  const { data, loading } = useMentorsQuery();
  return (
    <Layout maxWidth="sm">
      <h1>MENTORS</h1>

      {!loading &&
        data?.mentors.map((mentor) => (
          <MentorCard
            mentorId={mentor.id}
            firstName={mentor.firstName}
            lastName={mentor.lastName}
          />
        ))}
    </Layout>
  );
};
