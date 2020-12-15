import { Chip, Grid } from "@material-ui/core";
import React from "react";
import {
  ExpertisesByIdDocument,
  useDeleteExpertiseByAdminMutation,
  useExpertisesByIdQuery,
} from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../shared/generalCard/GeneralCard";
import { Expertise } from "./Expertise";

interface ExpertiseListProps {
  id: number;
}

export const ExpertiseList: React.FC<ExpertiseListProps> = ({ id }) => {
  const { data } = useExpertisesByIdQuery({
    variables: { mentorId: id },
  });

  const [deleteExpertise] = useDeleteExpertiseByAdminMutation();

  const handleDelete = async (expertiseId: number) => {
    await deleteExpertise({
      variables: { expertiseId },
      refetchQueries: [
        { query: ExpertisesByIdDocument, variables: { mentorId: id } },
      ],
    });
  };

  return (
    <GeneralCard title="Expertise">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data?.expertisesById.map(
            (expertise) =>
              expertise.descriptionText && (
                <Expertise
                  key={expertise.id}
                  id={expertise.id}
                  skill={expertise.skill.name}
                  description={expertise.description}
                  mentorId={id}
                />
              )
          )}
          {data?.expertisesById.map((expertise) => {
            if (!expertise.descriptionText) {
              return (
                <Grid item key={expertise.id}>
                  <Chip
                    label={expertise.skill.name}
                    onDelete={() => handleDelete(expertise.id)}
                    color="primary"
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </GeneralCard>
  );
};
