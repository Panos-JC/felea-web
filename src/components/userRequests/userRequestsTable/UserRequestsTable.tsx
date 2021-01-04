import { makeStyles, fade, Avatar, Link } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import MaterialTable from "material-table";
import moment from "moment";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useIndividualRequestsQuery } from "../../../generated/graphql";
import { SessionTag } from "../../dashboard/sessions/sessionTag/SessionTag";
import { Loading } from "../../shared/loading/Loading";

const useStyles = makeStyles((theme) => ({
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  successChip: {
    backgroundColor: fade(theme.palette.success.light, 0.5),
    color: theme.palette.success.dark,
  },
  warnChip: {
    backgroundColor: fade(theme.palette.warning.light, 0.5),
    color: theme.palette.warning.dark,
  },
  errorChip: {
    backgroundColor: fade(theme.palette.error.light, 0.5),
    color: theme.palette.error.dark,
  },
  completeChip: {
    backgroundColor: fade(theme.palette.secondary.light, 0.5),
    color: theme.palette.secondary.dark,
  },
  link: {
    fontSize: 14,
  },
}));

interface UserRequestsTableProps {}

export const UserRequestsTable: React.FC<UserRequestsTableProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { data, loading } = useIndividualRequestsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      {data.individualRequests.data && (
        <MaterialTable
          title="My requests"
          columns={[
            {
              title: "ID",
              field: "id",
            },
            {
              title: "Mentor",
              render: (rowData) => (
                <div className={classes.nameCell}>
                  <Avatar
                    className={classes.avatar}
                    src={rowData.mentor.user.avatar || ""}
                  />
                  <div>
                    <Link
                      className={classes.link}
                      color="inherit"
                      component={RouterLink}
                      to={`/mentor/${rowData.mentor.id}`}
                      variant="h6"
                    >
                      {`${rowData.mentor.firstName} ${rowData.mentor.lastName}`}
                    </Link>
                  </div>
                </div>
              ),
            },
            { title: "Subject", field: "subject" },
            {
              title: "Status",
              render: (rowData) => <SessionTag status={rowData.status} />,
            },
            {
              title: "Amount",
              render: (rowData) => <span>&euro;{rowData.amount / 100}</span>,
            },
            {
              title: "Scheduled Date",
              render: (rowData) => (
                <span>
                  {rowData.date &&
                    moment(new Date(parseInt(rowData.date))).format(
                      "MMMM Do YYYY"
                    )}
                </span>
              ),
            },
          ]}
          data={data.individualRequests.data.map((req) => {
            return {
              id: req.id,
              mentor: req.mentor,
              subject: req.headline,
              objective: req.objective,
              status: req.status,
              amount: req.ammount,
              date: req.selectedDate,
            };
          })}
          options={{
            draggable: false,
            emptyRowsWhenPaging: false,
            pageSize: 10,
            pageSizeOptions: [10, 20],
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <ArrowForward color="primary" />,
              tooltip: "Details",
              onClick: (event, rowData: any) =>
                history.push(`/user/requests/${rowData.id}`),
            },
          ]}
        />
      )}
    </>
  );
};
