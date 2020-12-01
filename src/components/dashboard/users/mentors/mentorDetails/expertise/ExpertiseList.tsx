import { Grid } from "@material-ui/core";
import React from "react";
import { useExpertisesByIdQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../generalCard/GeneralCard";
import { Expertise } from "./Expertise";

interface ExpertiseListProps {
  id: number;
}

export const ExpertiseList: React.FC<ExpertiseListProps> = ({ id }) => {
  const { data } = useExpertisesByIdQuery({
    variables: { mentorId: id },
  });
  return (
    <GeneralCard title="Expertise">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data?.expertisesById.map((expertise) => (
            <Expertise
              key={expertise.id}
              id={expertise.id}
              skill={expertise.skill.name}
              description={expertise.description}
              mentorId={id}
            />
          ))}
        </Grid>
      </Grid>
    </GeneralCard>
  );
};
