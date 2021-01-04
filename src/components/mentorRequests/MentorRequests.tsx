import { Tabs, Tab, Paper, makeStyles } from "@material-ui/core";
import React from "react";
import { useRequestsByMentorQuery } from "../../generated/graphql";
import { Layout } from "../shared/layout/Layout";
import { Loading } from "../shared/loading/Loading";
import { TabPanel } from "../shared/tabPanel/TabPanel";
import { RequestCard } from "./request/RequestCard";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: theme.spacing(2),
  },
}));

interface MentorRequestsProps {}

export const MentorRequests: React.FC<MentorRequestsProps> = () => {
  const classes = useStyles();
  const { data, loading } = useRequestsByMentorQuery();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout maxWidth="md">
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
          <Tab label="Canceled" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>
      {loading || !data ? (
        <Loading />
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {data.requestsByMentor.requests?.pending.map((request) => (
              <RequestCard key={request.id} data={request} pending />
            ))}
            {data.requestsByMentor.requests?.pending.length === 0 && (
              <div>No pending requests</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {data.requestsByMentor.requests?.accepted.map((request) => (
              <RequestCard key={request.id} data={request} accepted />
            ))}
            {data.requestsByMentor.requests?.accepted.length === 0 && (
              <div>No accepted requests</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {data.requestsByMentor.requests?.declined.map((request) => (
              <RequestCard key={request.id} data={request} />
            ))}
            {data.requestsByMentor.requests?.declined.length === 0 && (
              <div>No declined requests</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {data.requestsByMentor.requests?.canceled.map((request) => (
              <RequestCard key={request.id} data={request} />
            ))}
            {data.requestsByMentor.requests?.canceled.length === 0 && (
              <div>No canceled sessions</div>
            )}
          </TabPanel>
          <TabPanel value={value} index={4}>
            {data.requestsByMentor.requests?.completed.map((request) => (
              <RequestCard key={request.id} data={request} />
            ))}
            {data.requestsByMentor.requests?.completed.length === 0 && (
              <div>No completed sessions</div>
            )}
          </TabPanel>
        </>
      )}
    </Layout>
  );
};
