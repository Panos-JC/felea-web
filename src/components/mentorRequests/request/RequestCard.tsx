import {
  Card,
  Avatar,
  Typography,
  Divider,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import useStyles from "./RequestCardStyles";
import moment from "moment";
import React, { useState } from "react";
import {
  RequestsByMentorDocument,
  SessionRequestFragment,
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useDeclineRequestMutation,
} from "../../../generated/graphql";

interface RequestCardProps {
  pending?: boolean;
  accepted?: boolean;
  data: SessionRequestFragment;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  data,
  pending = false,
  accepted = false,
}) => {
  const classes = useStyles();

  // State
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  // GraphQL
  const [
    acceptRequest,
    { loading: acceptLoading },
  ] = useAcceptRequestMutation();
  const [
    declineRequest,
    { loading: declineLoading },
  ] = useDeclineRequestMutation();
  const [
    cancelRequest,
    { loading: cancelLoading },
  ] = useCancelRequestMutation();

  const handleAccept = async () => {
    await acceptRequest({
      variables: { requestId: data.id, date: value },
      refetchQueries: [{ query: RequestsByMentorDocument }],
    });
  };

  const handleDecline = async () => {
    await declineRequest({
      variables: { requestId: data.id },
      refetchQueries: [{ query: RequestsByMentorDocument }],
    });
  };

  const handleCancel = async () => {
    await cancelRequest({
      variables: { requestId: data.id },
      refetchQueries: [{ query: RequestsByMentorDocument }],
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    console.log(data.suggestedDate1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.head}>
          <Avatar
            className={classes.avatar}
            src={data.individual.user.avatar || ""}
          />
          <div className={classes.titles}>
            <Typography className={classes.name} variant="subtitle2">
              {`${data.individual.firstName} ${data.individual.lastName}`}
            </Typography>
            <Typography className={classes.headline}>
              Objective: {data.objective}
            </Typography>
            <Typography className={classes.date}>
              {moment(new Date(parseInt(data.createdAt))).format("MMM Do YY")}
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
          <Typography variant="h6">{data.headline}</Typography>
          <Typography className={classes.message} variant="body2">
            {data.message}
          </Typography>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
          {!pending && data.selectedDate && (
            <>
              <Typography>Selected date:</Typography>
              <Typography variant="subtitle2">
                {moment(new Date(data.selectedDate)).format(
                  "MMMM Do YYYY, h:mm a"
                )}
              </Typography>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            </>
          )}
          {pending && (
            <>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  User suggested dates: (Pick one in order to accept)
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={data.suggestedDate1}
                    control={<Radio />}
                    label={moment(new Date(data.suggestedDate1)).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                  <FormControlLabel
                    value={data.suggestedDate2}
                    control={<Radio />}
                    label={moment(new Date(data.suggestedDate2)).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                  <FormControlLabel
                    value={data.suggestedDate3}
                    control={<Radio />}
                    label={moment(new Date(data.suggestedDate3)).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                </RadioGroup>
              </FormControl>
              <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            </>
          )}
          <div className={classes.infoWrapper}>
            <div className={classes.info}>
              <Typography className={classes.headline}>
                Preferred communication tool
              </Typography>
              <Typography className={classes.date}>
                {data.communicationTool} - ID: {data.communicationToolId}
              </Typography>
            </div>
            <div className={classes.info}>
              <Typography className={classes.headline}>Email</Typography>
              <Typography className={classes.date}>{data.email}</Typography>
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
              disabled={acceptLoading || declineLoading || !value}
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
        {accepted && (
          <Button
            onClick={() => setOpen(true)}
            size="small"
            className={classes.cancelBtn}
            variant="outlined"
          >
            Cancel
          </Button>
        )}
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cancel Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={handleCancel}
            color="primary"
            autoFocus
            disabled={cancelLoading}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
