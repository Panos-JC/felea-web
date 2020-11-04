import {
  Typography,
  Tabs,
  Tab,
  Paper,
  Box,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useRequestsByMentorQuery } from "../../generated/graphql";
import { Layout } from "../layout/Layout";
import { Loading } from "../loading/Loading";
import { RequestCard } from "./request/RequestCard";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(2),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface MentorRequestsProps {}

export const MentorRequests: React.FC<MentorRequestsProps> = () => {
  const classes = useStyles();
  const { data, loading } = useRequestsByMentorQuery();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout maxWidth="sm">
      <Paper>
        <Tabs
          className={classes.tabs}
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          centered
        >
          <Tab label="Pending" />
          <Tab label="Accepted" />
          <Tab label="Declined" />
        </Tabs>
      </Paper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.pending.map((request) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  avatar={request.individual.user.avatar}
                  firstName={request.individual.firstName}
                  lastName={request.individual.lastName}
                  email={request.email}
                  objective={request.objective}
                  headline={request.headline}
                  message={request.message}
                  tool={request.communicationTool}
                  toolId={request.communicationToolId}
                  premium={request.individual.premium}
                  date={request.createdAt}
                  pending
                />
              ))}
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.pending.length === 0 && (
                <div>No pending requests</div>
              )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.accepted.map((request) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  avatar={request.individual.user.avatar}
                  firstName={request.individual.firstName}
                  lastName={request.individual.lastName}
                  email={request.email}
                  objective={request.objective}
                  headline={request.headline}
                  message={request.message}
                  tool={request.communicationTool}
                  toolId={request.communicationToolId}
                  premium={request.individual.premium}
                  date={request.createdAt}
                />
              ))}
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.accepted.length === 0 && (
                <div>No declined requests</div>
              )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.declined.map((request) => (
                <RequestCard
                  key={request.id}
                  id={request.id}
                  avatar={request.individual.user.avatar}
                  firstName={request.individual.firstName}
                  lastName={request.individual.lastName}
                  email={request.email}
                  objective={request.objective}
                  headline={request.headline}
                  message={request.message}
                  tool={request.communicationTool}
                  toolId={request.communicationToolId}
                  premium={request.individual.premium}
                  date={request.createdAt}
                />
              ))}
            {data &&
              data.requestsByMentor &&
              data.requestsByMentor.requests &&
              data.requestsByMentor.requests.declined.length === 0 && (
                <div>No declined requests</div>
              )}
          </TabPanel>
        </>
      )}
    </Layout>
  );
};
