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
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { useIndividualRequestByIdQuery } from "../../../generated/graphql";
import { SessionTag } from "../../dashboard/sessions/sessionTag/SessionTag";
import { Layout } from "../../layout/Layout";
import { Loading } from "../../loading/Loading";

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
}));

type Params = {
  id: string;
};

interface UserRequestPageProps {}

export const UserRequestPage: React.FC<UserRequestPageProps> = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  const { data, loading } = useIndividualRequestByIdQuery({
    variables: { requestId: parseInt(id) },
  });

  return (
    <Layout maxWidth="sm">
      <Card className={classes.card}>
        <CardHeader title="Request Info" />
        <Divider />
        {loading ? (
          <Loading />
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Mentor</TableCell>
                <TableCell>
                  <div className={classes.userWrapper}>
                    <Avatar
                      src={
                        data?.individualRequestById.data?.mentor.user.avatar ||
                        ""
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
        )}
      </Card>
    </Layout>
  );
};
