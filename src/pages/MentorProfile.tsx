import { makeStyles, Typography } from "@material-ui/core";

import React, { useEffect } from "react";
import { GeneralCard } from "../components/MentorProfile/GeneralCard";
import { Layout } from "../components/Layout";
import { MentorInfoCard } from "../components/MentorProfile/MentorInfoCard";
import { useState } from "react";
import { Experience } from "../components/MentorProfile/Experience";
import { useMeQuery } from "../generated/graphql";

const useStyles = makeStyles((theme) => ({
  workExperience: {},
  role: {
    marginBottom: "1rem",
    fontSize: "0.875rem",
    color: theme.palette.text.primary,
  },
  company: {
    color: theme.palette.text.secondary,
    fontSize: "0.9rem",
  },
  date: {
    color: theme.palette.text.secondary,
    fontSize: "75%",
  },
  description: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  addWorkWrapper: {
    textAlign: "center",
  },
  addWorkBtn: {},
}));

interface MentorProfileProps {}

export const MentorProfile: React.FC<MentorProfileProps> = () => {
  const classes = useStyles();

  const { data, loading } = useMeQuery();

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const [workExperience, setWorkExperience] = useState([
    {
      role: "Digital Strategist",
      company: "Enhancv",
      from: "Nov 2016",
      to: "May 2019",
      description:
        "Enhancv helps you highlight your achievements, attitude, and personality to stand out and feel proud. The company has been featured at Forbes, Business Insider, Inc. Magazine, Lifehacker, The Hill. As part of my work there, I led the implementation of a full measurement strategy and helped implement the data-driven approach for the whole team. I set up and led the first growth experimentation process in the company. Together with a colleague, we planned and executed an extensive customer research project through the Jobs-to-be-done methodology and implemented the findings in a product repositioning.",
    },
  ]);

  return (
    <Layout maxWidth="sm">
      {!loading && (
        <MentorInfoCard
          firstName={data?.me?.mentor?.firstName}
          lastName={data?.me?.mentor?.lastName}
          avatar={data?.me?.avatar}
        />
      )}
      <GeneralCard title="About">
        <Typography variant="body2" color="textSecondary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt saepe
          vero laboriosam alias vel similique voluptatibus aliquam ratione
          doloremque esse, quibusdam sint excepturi fuga assumenda qui error ut
          omnis eveniet? Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Sunt saepe vero laboriosam alias vel similique voluptatibus
          aliquam ratione doloremque esse, quibusdam sint excepturi fuga
          assumenda qui error ut omnis eveniet?Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Sunt saepe vero laboriosam alias vel
          similique voluptatibus aliquam ratione doloremque esse, quibusdam sint
          excepturi fuga assumenda qui error ut omnis eveniet?
        </Typography>
      </GeneralCard>
      <Experience
        workExperience={workExperience}
        setWorkExperience={setWorkExperience}
      />
    </Layout>
  );
};
