import { Grid, Card, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "../../../pageTitle/PageTitle";
import { Bio } from "./bio/Bio";
import { EditBio } from "./bio/EditBio";
import { AddCertificate } from "./certificates/AddCertificate";
import { CertificateList } from "./certificates/CertificateList";
import { AddEducation } from "./education/AddEducation";
import { EducationList } from "./education/EducationList";
import { CreateExpertise } from "./expertise/CreateExpertise";
import { ExpertiseList } from "./expertise/ExpertiseList";
// import { GeneralInfo } from "./general/GeneralInfo";
import { UploadAvatar } from "./general/UploadAvatar";
import { EditMotto } from "./motto/EditMotto";
import { Motto } from "./motto/Motto";
import { AddWorkExperience } from "./workExperience/AddWorkExperience";
import { Experience } from "./workExperience/Experience";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

type Params = {
  id: string;
};

interface EditMentorDetailsProps {}

export const EditMentorDetails: React.FC<EditMentorDetailsProps> = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  const idNum = parseInt(id);

  return (
    <>
      <PageTitle title="Edit Mentor Profile" />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <UploadAvatar id={idNum} />
        </Grid>
        <Grid item xs={9}>
          {/* <GeneralInfo id={idNum} /> */}
        </Grid>
        <Grid item xs={6}>
          <Bio mentorId={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <EditBio mentorId={idNum} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Motto id={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <EditMotto id={idNum} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <ExpertiseList id={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CreateExpertise id={idNum} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Experience id={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <AddWorkExperience id={idNum} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <EducationList id={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <AddEducation id={idNum} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <CertificateList id={idNum} />
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <AddCertificate id={idNum} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
