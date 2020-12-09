import {
  makeStyles,
  Fab,
  Card,
  Paper,
  Tab,
  Tabs,
  Divider,
  Zoom,
  useTheme,
  Slide,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import {
  useCertificatesQuery,
  useEducationsQuery,
  useWorkExperiencesQuery,
} from "../../../generated/graphql";
import { CreateWorkExperience } from "./workExperience/createWorkExperience/CreateWorkExperience";
import { WorkExperience } from "./workExperience/WorkExperience";
import { TabPanel } from "../../tabPanel/TabPanel";
import { Education } from "./education/Education";
import { Loading } from "../../loading/Loading";
import { CreateEducation } from "./education/createEducation/CreateEducation";
import { SuccessStory } from "./certificates/SuccessStory";
import { CreateSuccessStory } from "./certificates/createSuccessStory/CreateSuccessStory";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "initial",
  },
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
  picker: {
    width: "100%",
  },
  paper: {
    position: "relative",
    padding: theme.spacing(2),
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

interface ExperienceProps {
  id: number;
  editable: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ id, editable }) => {
  const classes = useStyles();
  const theme = useTheme();

  // state
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = React.useState(0);

  // Queries
  const {
    data: workExperiencesData,
    loading: workExperiencesLoading,
  } = useWorkExperiencesQuery({ variables: { mentorId: id } });
  const {
    data: educationData,
    loading: educationLoading,
  } = useEducationsQuery({ variables: { mentorId: id } });
  const {
    data: certificateData,
    loading: certificateLoading,
  } = useCertificatesQuery({ variables: { mentorId: id } });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    setEdit(false);
  };

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <Card className={classes.card}>
      <Paper elevation={0}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Work Experience" />
          <Tab label="Education" />
          <Tab label="Success Stories" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Paper className={classes.paper} elevation={0}>
          {workExperiencesLoading ? (
            <Loading />
          ) : (
            <>
              <Slide direction="down" in={edit} mountOnEnter unmountOnExit>
                <div>
                  <CreateWorkExperience mentorId={id} setEdit={setEdit} />
                </div>
              </Slide>

              {workExperiencesData?.workExperiences.data &&
                workExperiencesData.workExperiences.data.length < 1 &&
                editable && (
                  <Typography>Please add your work experience.</Typography>
                )}

              {workExperiencesData?.workExperiences.data?.map((work, index) => (
                <>
                  <WorkExperience
                    editable={editable}
                    mentorId={id}
                    key={work.id}
                    id={work.id}
                    role={work.role}
                    company={work.companyName}
                    from={work.from}
                    to={work.untill}
                    description={work.description}
                    industries={work.industries!}
                  />
                  {workExperiencesData.workExperiences.data &&
                    workExperiencesData.workExperiences.data.length >
                      index + 1 && <Divider className={classes.divider} />}
                </>
              ))}
            </>
          )}
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper className={classes.paper} elevation={0}>
          {educationLoading ? (
            <Loading />
          ) : (
            <>
              <Slide direction="down" in={edit} mountOnEnter unmountOnExit>
                <div>
                  <CreateEducation mentorId={id} setEdit={setEdit} />
                </div>
              </Slide>

              {educationData?.educations.data &&
                educationData.educations.data.length < 1 &&
                editable && <Typography>Please add your education.</Typography>}

              {educationData?.educations.data?.map((education, index) => (
                <>
                  <Education
                    key={education.id}
                    values={education}
                    mentorId={id}
                  />
                  {educationData.educations.data &&
                    educationData.educations.data.length > index + 1 && (
                      <Divider className={classes.divider} />
                    )}
                </>
              ))}
            </>
          )}
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper className={classes.paper} elevation={0}>
          {certificateLoading ? (
            <Loading />
          ) : (
            <>
              <Slide direction="down" in={edit} mountOnEnter unmountOnExit>
                <div>
                  <CreateSuccessStory mentorId={id} setEdit={setEdit} />
                </div>
              </Slide>

              {certificateData?.certificates.data &&
                certificateData.certificates.data.length < 1 &&
                editable && (
                  <Typography>Please add your success story.</Typography>
                )}

              {certificateData?.certificates.data?.map((certificate, index) => (
                <>
                  <SuccessStory
                    key={certificate.id}
                    data={certificate}
                    mentorId={id}
                  />
                  {certificateData.certificates.data &&
                    certificateData.certificates.data.length > index + 1 && (
                      <Divider className={classes.divider} />
                    )}
                </>
              ))}
            </>
          )}
        </Paper>
      </TabPanel>
      {editable &&
        [1, 2, 3].map((fab, index) => (
          <Zoom
            key={fab}
            in={value === index}
            timeout={{
              enter: theme.transitions.duration.enteringScreen,
              exit: theme.transitions.duration.leavingScreen,
            }}
            style={{
              transitionDelay: `${
                value === index ? theme.transitions.duration.leavingScreen : 0
              }ms`,
            }}
            unmountOnExit
          >
            <Fab
              onClick={handleClick}
              className={classes.fab}
              size="small"
              color="primary"
            >
              <Add className={`${classes.icon} ${edit && classes.rotate}`} />
            </Fab>
          </Zoom>
        ))}
    </Card>
  );
};
