import {
  Card,
  Avatar,
  Typography,
  Chip,
  Divider,
  Button,
} from "@material-ui/core";
import useStyles from "./RequestCardStyles";
import moment from "moment";
import React from "react";
import {
  RequestsByMentorDocument,
  useAcceptRequestMutation,
  useDeclineRequestMutation,
} from "../../../generated/graphql";

interface RequestCardProps {
  id: number;
  avatar: string | null | undefined;
  firstName: string;
  lastName: string;
  email: string;
  premium: boolean;
  headline: string;
  objective: string;
  message: string;
  tool: string;
  toolId: string;
  date: string;
  pending?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  id,
  avatar,
  firstName,
  lastName,
  email,
  premium,
  objective,
  headline,
  message,
  tool,
  toolId,
  date,
  pending = false,
}) => {
  const classes = useStyles();

  // GraphQL
  const [
    acceptRequest,
    { loading: acceptLoading },
  ] = useAcceptRequestMutation();
  const [
    declineRequest,
    { loading: declineLoading },
  ] = useDeclineRequestMutation();

  const handleAccept = async () => {
    const { data } = await acceptRequest({
      variables: { requestId: id },
      refetchQueries: [{ query: RequestsByMentorDocument }],
    });
  };

  const handleDecline = async () => {
    const { data } = await declineRequest({
      variables: { requestId: id },
      refetchQueries: [{ query: RequestsByMentorDocument }],
    });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.head}>
        <Avatar className={classes.avatar} src={avatar || ""} />
        <div className={classes.titles}>
          <Typography className={classes.name} variant="subtitle2">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography className={classes.headline}>
            Subject: {objective}
          </Typography>
          <Typography className={classes.date}>
            {moment(new Date(parseInt(date))).format("MMM Do YY")}
          </Typography>
        </div>
        {/* {premium ? (
          <Chip label="Premium" size="small" className={classes.chipSuccess} />
        ) : (
          <Chip label="Free" size="small" className={classes.chipWarning} />
        )} */}
      </div>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <div>
        <Typography variant="h6">{headline}</Typography>
        <Typography className={classes.message} variant="body2">
          {message}
        </Typography>
        <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        <div className={classes.infoWrapper}>
          <div className={classes.info}>
            <Typography className={classes.headline}>
              Preferred communication tool
            </Typography>
            <Typography className={classes.date}>
              {tool} - ID: {toolId}
            </Typography>
          </div>
          <div className={classes.info}>
            <Typography className={classes.headline}>Email</Typography>
            <Typography className={classes.date}>{email}</Typography>
          </div>
        </div>
      </div>
      {pending && (
        <div className={classes.actions}>
          <Button
            onClick={handleAccept}
            size="small"
            color="primary"
            variant="contained"
            disableElevation
            disabled={acceptLoading || declineLoading}
          >
            Accept
          </Button>
          <Button
            onClick={handleDecline}
            className={classes.declineBtn}
            size="small"
            variant="contained"
            disableElevation
            disabled={acceptLoading || declineLoading}
          >
            Decline
          </Button>
        </div>
      )}
    </Card>
  );
};
