// import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Layout } from "../layout/Layout";
import { MentorCard } from "./MentorCard";
import { useMentorsQuery } from "../../generated/graphql";
import {
  makeStyles,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { SkillFilters } from "./SkillFilters";

const useStyles = makeStyles((theme) => ({
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: "1.5rem",
    lineHeight: 2,
    marginTop: 40,
  },
  title2: {
    fontSize: "0.875rem",
    lineHeight: 3.5,
    fontWeight: 500,
    marginTop: 40,
  },
  filterCard: {
    padding: 20,
  },
  filterTitle: {
    marginBottom: "1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  filter: {
    fontSize: 14,
    fontWeight: 400,
  },
}));

interface MentorsProps {}

export const Mentors: React.FC<MentorsProps> = () => {
  const classes = useStyles();

  // State
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);

  // Remote State
  const { data, loading } = useMentorsQuery({
    variables: { skills: selectedSkill, industries: selectedIndustry },
  });

  // Handle skill filter change
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const onList = selectedSkill.includes(e.target.value);

    onList
      ? setSelectedSkill(
          selectedSkill.filter((skill) => skill !== e.target.value)
        )
      : setSelectedSkill([...selectedSkill, e.target.value]);
  };

  // Handle industry filter change
  const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onList = selectedIndustry.includes(e.target.value);

    onList
      ? setSelectedIndustry(
          selectedIndustry.filter((industry) => industry !== e.target.value)
        )
      : setSelectedIndustry([...selectedIndustry, e.target.value]);
  };

  return (
    <Layout maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography className={classes.title}>Find a mentor</Typography>
        </Grid>
        <Grid item xs={9}>
          {/* <Typography className={classes.title2}>
            {selectedMentors
              ? selectedMentors.length === 0
                ? data && data.mentors.length
                : selectedMentors.length
              : 0}{" "}
            mentors found
          </Typography> */}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={3}>
          <SkillFilters
            handleSkillChange={handleSkillChange}
            handleIndustryChange={handleIndustryChange}
          />
        </Grid>
        <Grid item xs={9}>
          {loading ? (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          ) : null}
          {data &&
            data.mentors.map((mentor) => (
              <MentorCard
                key={mentor.mentor.id}
                mentorId={mentor.mentor.id}
                firstName={mentor.mentor.firstName}
                title={mentor.mentor.title}
                rate={mentor.mentor.rate}
                lastName={mentor.mentor.lastName}
                bio={mentor.mentor.bio}
                sessions={mentor.sessions}
                expertises={mentor.mentor.expertises}
                location={mentor.mentor.location}
                languages={mentor.mentor.languages}
                rating={mentor.avg}
              />
            ))}
        </Grid>
      </Grid>
    </Layout>
  );
};
