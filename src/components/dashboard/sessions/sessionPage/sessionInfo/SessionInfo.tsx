import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Divider,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardActions,
  Button,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import {
  SessionRequestByIdDocument,
  SessionRequestsDocument,
  useSessionRequestByIdQuery,
  useSetRequestCompleteMutation,
} from "../../../../../generated/graphql";
import { Loading } from "../../../../loading/Loading";
import { SessionTag } from "../../sessionTag/SessionTag";

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  userTitles: {
    marginLeft: theme.spacing(1),
  },
}));

type Params = {
  id: string;
};

interface SessionInfoProps {}

export const SessionInfo: React.FC<SessionInfoProps> = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  // GraphQL
  const { data, loading } = useSessionRequestByIdQuery({
    variables: { requestId: parseInt(id) },
  });
  const [
    setRequestComplte,
    { loading: reqCompleteLoading },
  ] = useSetRequestCompleteMutation();

  const handleComplete = async () => {
    await setRequestComplte({
      variables: { requestId: parseInt(id) },
      refetchQueries: [
        {
          query: SessionRequestByIdDocument,
          variables: { requestId: parseInt(id) },
        },
        {
          query: SessionRequestsDocument,
        },
      ],
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card>
      <CardHeader title="Request Info" />
      <Divider />
      {data && data.sessionRequestById && data.sessionRequestById.data && (
        <>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>
                  <div className={classes.userWrapper}>
                    <Avatar />
                    <div className={classes.userTitles}>
                      <Typography variant="subtitle2">
                        {`${data.sessionRequestById.data.individual.firstName} ${data.sessionRequestById.data.individual.lastName}`}
                      </Typography>
                      <Typography variant="body2">
                        {data.sessionRequestById.data.individual.user.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mentor</TableCell>
                <TableCell>
                  <div className={classes.userWrapper}>
                    <Avatar />
                    <div className={classes.userTitles}>
                      <Typography variant="subtitle2">
                        {`${data.sessionRequestById.data.mentor.firstName} ${data.sessionRequestById.data.mentor.lastName}`}
                      </Typography>
                      <Typography variant="body2">
                        {data.sessionRequestById.data.mentor.user.email}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ammount</TableCell>
                <TableCell>
                  <Typography>
                    &euro;{data.sessionRequestById.data.ammount / 100}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>
                  {data.sessionRequestById.data.status && (
                    <SessionTag status={data.sessionRequestById.data.status} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Payment Status</TableCell>
                <TableCell>
                  {data.sessionRequestById.data.paymentStatus && (
                    <SessionTag
                      status={data.sessionRequestById.data.paymentStatus}
                    />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>
                  <Typography>
                    {moment(data.sessionRequestById.data.date).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Message</TableCell>
                <TableCell>
                  <Typography>
                    {data.sessionRequestById.data.message}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <CardActions>
            <Button
              onClick={handleComplete}
              variant="contained"
              color="primary"
              size="small"
              disabled={
                data.sessionRequestById.data.status === "complete" ||
                data.sessionRequestById.data.status === "pending" ||
                data.sessionRequestById.data.status === "declined" ||
                reqCompleteLoading
              }
              disableElevation
            >
              Mark as complete
            </Button>
          </CardActions>
        </>
      )}
      {data && data.sessionRequestById && data.sessionRequestById.errorMsg && (
        <div>{data.sessionRequestById.errorMsg}</div>
      )}
    </Card>
  );
};
