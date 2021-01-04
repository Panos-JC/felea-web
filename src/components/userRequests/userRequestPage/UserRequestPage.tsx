import {
  makeStyles,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import moment from "moment";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  IndividualRequestsDocument,
  useDeleteRequestByUserMutation,
  useIndividualRequestByIdQuery,
} from "../../../generated/graphql";
import { SessionTag } from "../../dashboard/sessions/sessionTag/SessionTag";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";
import { Layout } from "../../shared/layout/Layout";
import { Loading } from "../../shared/loading/Loading";

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  userTitles: {
    marginLeft: theme.spacing(1),
  },
  card: {
    marginTop: theme.spacing(2),
  },
  deleteBtn: {
    background: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      background: theme.palette.error.dark,
    },
  },
}));

type Params = {
  id: string;
};

interface UserRequestPageProps {}

export const UserRequestPage: React.FC<UserRequestPageProps> = () => {
  const classes = useStyles();

  // Router
  const { id } = useParams<Params>();
  const history = useHistory();

  const idNum = parseInt(id);

  // State
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // GraphQL
  const { data, loading } = useIndividualRequestByIdQuery({
    variables: { requestId: idNum },
  });
  const [deleteRequest] = useDeleteRequestByUserMutation();

  const handleDelete = async () => {
    const { data: deleteData } = await deleteRequest({
      variables: { requestId: idNum },
      refetchQueries: [
        {
          query: IndividualRequestsDocument,
        },
      ],
    });

    if (deleteData?.deleteRequestByUser.deleted) {
      history.push("/user/requests");
    } else if (deleteData?.deleteRequestByUser.errorMsg) {
      setMessage(deleteData.deleteRequestByUser.errorMsg);
      setOpen(true);
    }
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <Layout maxWidth="sm">
      <Card className={classes.card}>
        <CardHeader title="Request Info" />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Mentor</TableCell>
              <TableCell>
                <div className={classes.userWrapper}>
                  <Avatar
                    src={
                      data?.individualRequestById.data?.mentor.user.avatar || ""
                    }
                  />
                  <div className={classes.userTitles}>
                    <Typography variant="subtitle2">{`${data?.individualRequestById.data?.mentor.firstName} ${data?.individualRequestById.data?.mentor.lastName}`}</Typography>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ammount</TableCell>
              <TableCell>
                <Typography>
                  &euro;
                  {(data?.individualRequestById.data?.ammount || 0) / 100}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>
                <SessionTag
                  status={data?.individualRequestById.data?.status || ""}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Suggested Dates</TableCell>
              <TableCell>
                <Typography>
                  {moment(
                    new Date(data?.individualRequestById.data?.suggestedDate1)
                  ).format("MMMM Do YYYY, h:mm a")}
                </Typography>
                <Typography>
                  {moment(
                    new Date(data?.individualRequestById.data?.suggestedDate2)
                  ).format("MMMM Do YYYY, h:mm a")}
                </Typography>
                <Typography>
                  {moment(
                    new Date(data?.individualRequestById.data?.suggestedDate3)
                  ).format("MMMM Do YYYY, h:mm a")}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Scheduled Date</TableCell>
              <TableCell>
                <Typography>
                  {data?.individualRequestById.data?.selectedDate
                    ? moment(
                        new Date(data?.individualRequestById.data?.selectedDate)
                      ).format("MMMM Do YYYY, h:mm a")
                    : "Not set"}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>
                <Typography>
                  {moment(
                    new Date(
                      parseInt(
                        data?.individualRequestById.data?.createdAt || ""
                      )
                    )
                  ).format("MMMM Do YYYY")}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>
                <Typography>
                  {data?.individualRequestById.data?.message}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <CardActions>
          <Button
            onClick={handleDelete}
            className={classes.deleteBtn}
            variant="contained"
            disableElevation
            disabled={data?.individualRequestById.data?.status !== "pending"}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <GeneralSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        type="error"
      />
    </Layout>
  );
};
