import { makeStyles, Fab, Grid, Chip, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import {
  ExpertiseFragment,
  ExpertisesDocument,
  useDeleteExpertiseMutation,
} from "../../../generated/graphql";
import { NewSkillForm } from "../forms/NewSkillForm";
import { GeneralCard } from "../../generalCard/GeneralCard";
import { Expertise } from "./Expertise";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    top: theme.spacing(3),
    right: -theme.spacing(2),
  },
  icon: {
    transition: "all 0.3s",
  },
  rotate: {
    transform: "rotate(45deg)",
  },
}));

interface ExpertiseListProps {
  data?: ExpertiseFragment[];
  editable?: boolean;
}

export const ExpertiseList: React.FC<ExpertiseListProps> = ({
  data,
  editable = false,
}) => {
  const classes = useStyles();

  const [edit, setEdit] = useState<boolean>(false);

  const [deleteExpertise] = useDeleteExpertiseMutation();

  const handleDelete = async (id: number) => {
    await deleteExpertise({
      variables: { id },
      refetchQueries: [{ query: ExpertisesDocument }],
    });
  };

  return (
    <GeneralCard title="Skills">
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

        {/* If data is empty render this message (only for mentor) */}
        {data && data.length < 1 && editable && (
          <Typography>Please add your skills</Typography>
        )}

        {data?.map(
          (expertise) =>
            expertise.descriptionText && (
              <Grid item xs={12}>
                <Expertise
                  id={expertise.id}
                  skill={expertise.skill.name}
                  description={expertise.description}
                  editable={editable}
                />
              </Grid>
            )
        )}
        {data?.map((expertise) => {
          if (!expertise.descriptionText) {
            if (editable) {
              return (
                <Grid item>
                  <Chip
                    label={expertise.skill.name}
                    onDelete={() => handleDelete(expertise.id)}
                    color="primary"
                  />
                </Grid>
              );
            } else {
              return (
                <Grid item>
                  <Chip label={expertise.skill.name} color="primary" />
                </Grid>
              );
            }
          }
        })}
      </Grid>
    </GeneralCard>
  );
};
