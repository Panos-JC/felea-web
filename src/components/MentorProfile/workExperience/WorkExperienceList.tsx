import {
  makeStyles,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useWorkExperiencesQuery } from "../../../generated/graphql";
import { WorkExperienceForm } from "../forms/WorkExperienceForm";
import { GeneralCard } from "../generalCard/GeneralCard";
import { WorkExperience } from "./WorkExperience";

const useStyles = makeStyles((theme) => ({
  addWorkWrapper: {
    textAlign: "center",
  },
  addWorkBtn: {},

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
  const [dialogOpen, setDialogOpen] = useState(false);

  // Queries
  const {
    data: workExperiencesData,
    loading: workExperiencesLoading,
  } = useWorkExperiencesQuery({ variables: { mentorId: id } });

  return (
    <GeneralCard title="Experience">
      {!workExperiencesLoading &&
        workExperiencesData?.workExperiences.map((work) => (
          <WorkExperience
            key={work.id}
            role={work.role}
            company={work.companyName}
            from={work.from}
            to={work.untill}
            description={work.description}
            industries={work.industries}
          />
        ))}
      {editable && (
        <div className={classes.addWorkWrapper}>
          <IconButton
            onClick={() => setDialogOpen(true)}
            className={classes.addWorkBtn}
            size="medium"
            color="secondary"
          >
            <Add fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="textSecondary">
            Add new position
          </Typography>
        </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="simple-dialog-title">
          Add new work position
        </DialogTitle>
        <DialogContent>
          <WorkExperienceForm mentorId={id} setDialog={setDialogOpen} />
        </DialogContent>
      </Dialog>
    </GeneralCard>
  );
};
