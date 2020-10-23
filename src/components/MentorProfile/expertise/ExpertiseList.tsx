import { makeStyles, Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useExpertisesQuery } from "../../../generated/graphql";
import { NewSkillForm } from "../forms/NewSkillForm";
import { GeneralCard } from "../generalCard/GeneralCard";
import { Expertise } from "./Expertise";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    top: 50,
    left: -20,
  },
  icon: {
    transition: "all 0.3s",
  },
  rotate: {
    transform: "rotate(45deg)",
  },
}));

interface ExpertiseListProps {
  mentorId: number;
}

export const ExpertiseList: React.FC<ExpertiseListProps> = ({ mentorId }) => {
  const classes = useStyles();

  const [edit, setEdit] = useState<boolean>(false);

  const { data, loading } = useExpertisesQuery({ variables: { mentorId } });

  return (
    <GeneralCard title="Expertise">
      <Fab
        onClick={() => setEdit(!edit)}
        className={classes.fab}
        size="small"
        color="primary"
      >
        <Add className={`${classes.icon} ${edit && classes.rotate}`} />
      </Fab>

      <Grid container spacing={2}>
        {edit && (
          <Grid item xs={12}>
            <NewSkillForm mentorId={mentorId} setEdit={setEdit} />
          </Grid>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.expertises &&
          data.expertises.map((expertise) => (
            <Grid item xs={12}>
              <Expertise
                skill={expertise.skill.name}
                description={expertise.description}
              />
            </Grid>
          ))
        )}
      </Grid>
    </GeneralCard>
  );
};
