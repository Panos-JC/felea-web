import { makeStyles, Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { Expertise as ExpertiseType, Skill } from "../../../generated/graphql";
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
  data?: ({
    __typename?: "Expertise" | undefined;
  } & Pick<ExpertiseType, "id" | "description"> & {
      skill: {
        __typename?: "Skill" | undefined;
      } & Pick<Skill, "id" | "name">;
    })[];
  loading?: boolean;
  editable?: boolean;
}

export const ExpertiseList: React.FC<ExpertiseListProps> = ({
  data,
  loading,
  editable = false,
}) => {
  const classes = useStyles();

  const [edit, setEdit] = useState<boolean>(false);

  return (
    <GeneralCard title="Expertise">
      {editable && (
        <Fab
          onClick={() => setEdit(!edit)}
          className={classes.fab}
          size="small"
          color="primary"
        >
          <Add className={`${classes.icon} ${edit && classes.rotate}`} />
        </Fab>
      )}

      <Grid container spacing={2}>
        {edit && (
          <Grid item xs={12}>
            <NewSkillForm setEdit={setEdit} />
          </Grid>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          data &&
          data.map((expertise) => (
            <Grid item xs={12}>
              <Expertise
                id={expertise.id}
                skill={expertise.skill.name}
                description={expertise.description}
                editable={editable}
              />
            </Grid>
          ))
        )}
      </Grid>
    </GeneralCard>
  );
};
