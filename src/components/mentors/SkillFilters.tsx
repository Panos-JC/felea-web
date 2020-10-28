import {
  makeStyles,
  Card,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { useIndustriesQuery, useSkillsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  title2: {
    fontSize: "0.875rem",
    lineHeight: 3.5,
    fontWeight: 500,
    marginTop: 40,
  },
  filterCard: {
    padding: 20,
    marginBottom: 20,
  },
  filterTitle: {
    marginBottom: "1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  filter: {
    fontSize: "80%",
    fontWeight: 400,
  },
}));

interface SkillFiltersProps {
  handleSkillChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  handleIndustryChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}

export const SkillFilters: React.FC<SkillFiltersProps> = ({
  handleSkillChange,
  handleIndustryChange,
}) => {
  const classes = useStyles();

  const { handleSubmit, register } = useForm();

  const { data: skillData } = useSkillsQuery();
  const { data: industryData } = useIndustriesQuery();

  const onSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <>
      <Card className={classes.filterCard}>
        <Typography className={classes.filterTitle}>Skills</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            {skillData &&
              skillData.skills &&
              skillData.skills.map((skill) => (
                <FormControlLabel
                  key={skill.id}
                  classes={{ label: classes.filter }}
                  value={skill.name}
                  control={
                    <Checkbox size="small" onChange={handleSkillChange} />
                  }
                  label={skill.name}
                  name={skill.name}
                  inputRef={register}
                />
              ))}
          </FormGroup>
        </form>
      </Card>
      <Card className={classes.filterCard}>
        <Typography className={classes.filterTitle}>Industries</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            {industryData &&
              industryData.industries &&
              industryData.industries.map((industry) => (
                <FormControlLabel
                  key={industry.id}
                  classes={{ label: classes.filter }}
                  value={industry.name}
                  control={
                    <Checkbox size="small" onChange={handleIndustryChange} />
                  }
                  label={industry.name}
                  name={industry.name}
                  inputRef={register}
                />
              ))}
          </FormGroup>
        </form>
      </Card>
    </>
  );
};
