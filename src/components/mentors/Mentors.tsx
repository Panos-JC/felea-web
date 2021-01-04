import React from "react";
import { Layout } from "../shared/layout/Layout";
import { MentorCard } from "./MentorCard";
import { useMentorsQuery } from "../../generated/graphql";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { Loading } from "../shared/loading/Loading";

const useStyles = makeStyles((theme) => ({
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
  // const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  // const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);

  // GraphQL
  const { data, loading } = useMentorsQuery({
    variables: { skills: [], industries: [] },
  });

  // Handle skill filter change
  // const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);

  //   const onList = selectedSkill.includes(e.target.value);

  //   onList
  //     ? setSelectedSkill(
  //         selectedSkill.filter((skill) => skill !== e.target.value)
  //       )
  //     : setSelectedSkill([...selectedSkill, e.target.value]);
  // };

  // Handle industry filter change
  // const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const onList = selectedIndustry.includes(e.target.value);

  //   onList
  //     ? setSelectedIndustry(
  //         selectedIndustry.filter((industry) => industry !== e.target.value)
  //       )
  //     : setSelectedIndustry([...selectedIndustry, e.target.value]);
  // };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <Layout maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography className={classes.title}>Our Mentors</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* <Grid item xs={3}>
          <SkillFilters
            handleSkillChange={handleSkillChange}
            handleIndustryChange={handleIndustryChange}
          />
        </Grid> */}

        {data.mentors.map((mentor) => (
          <Grid item xs={6}>
            <MentorCard
              mentor={mentor.mentor}
              avatar={mentor.mentor.user.avatar}
              sessions={mentor.sessions}
              rating={mentor.avg}
              expertises={mentor.mentor.expertises}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
