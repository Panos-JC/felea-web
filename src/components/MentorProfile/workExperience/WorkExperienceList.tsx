import { makeStyles, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useWorkExperiencesQuery } from "../../../generated/graphql";
import { WorkExperienceForm } from "../forms/WorkExperienceForm";
import { GeneralCard } from "../generalCard/GeneralCard";
import { WorkExperience } from "./WorkExperience";

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
  picker: {
    width: "100%",
  },
}));

interface WorkExperienceListProps {
  id: number;
  editable: boolean;
}

export const WorkExperienceList: React.FC<WorkExperienceListProps> = ({
  id,
  editable,
}) => {
  const classes = useStyles();

  // state
  const [edit, setEdit] = useState<boolean>(false);

  // Queries
  const {
    data: workExperiencesData,
    loading: workExperiencesLoading,
  } = useWorkExperiencesQuery({ variables: { mentorId: id } });

  return (
    <GeneralCard title="Experience">
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
      {edit && <WorkExperienceForm mentorId={id} setEdit={setEdit} />}

      {!workExperiencesLoading &&
        workExperiencesData?.workExperiences.map((work) => (
          <WorkExperience
            key={work.id}
            role={work.role}
            company={work.companyName}
            from={work.from}
            to={work.untill}
            description={work.description}
            industries={work.industries!}
          />
        ))}
    </GeneralCard>
  );
};
