import { makeStyles, Link, Avatar, Typography, fade } from "@material-ui/core";
import { ArrowForward } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import moment from "moment";
import { useSessionRequestsQuery } from "../../../../generated/graphql";
import { SessionTag } from "../sessionTag/SessionTag";
import { Loading } from "../../../shared/loading/Loading";
import MaterialTable from "material-table";

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
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

interface SessionsTableProps {}

export const SessionsTable: React.FC<SessionsTableProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { data, loading } = useSessionRequestsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div>
      <MaterialTable
        title=""
        columns={[
          {
            title: "#",
            render: (rowData) => <Typography>{rowData.id}</Typography>,
            searchable: false,
            sorting: false,
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
                    to={`/dashboard/users/mentor/${rowData.mentor.id}`}
                    variant="h6"
                  >
                    {`${rowData.mentor.firstName} ${rowData.mentor.lastName}`}
                  </Link>
                  <div className={classes.email}>
                    {rowData.mentor.user.email}
                  </div>
                </div>
              </div>
            ),
            sorting: false,
            customFilterAndSearch: (term, rowData) =>
              (
                rowData.mentor.firstName.toLowerCase() +
                " " +
                rowData.mentor.lastName.toLowerCase()
              ).indexOf(term.toLowerCase()) !== -1 ||
              rowData.mentor.user.email
                .toLowerCase()
                .indexOf(term.toLowerCase()) !== -1,
          },
          {
            title: "User",
            render: (rowData) => (
              <div className={classes.nameCell}>
                <Avatar
                  className={classes.avatar}
                  src={rowData.individual.user.avatar || ""}
                />
                <div>
                  <Link
                    className={classes.link}
                    color="inherit"
                    component={RouterLink}
                    to={`/dashboard/users/individual/${rowData.individual.id}`}
                    variant="h6"
                  >
                    {`${rowData.individual.firstName} ${rowData.individual.lastName}`}
                  </Link>
                  <div className={classes.email}>
                    {rowData.individual.user.email}
                  </div>
                </div>
              </div>
            ),
            sorting: false,
            customFilterAndSearch: (term, rowData) =>
              (
                rowData.individual.firstName.toLowerCase() +
                " " +
                rowData.individual.lastName.toLowerCase()
              ).indexOf(term.toLowerCase()) !== -1 ||
              rowData.individual.user.email
                .toLowerCase()
                .indexOf(term.toLowerCase()) !== -1,
          },
          {
            title: "Status",
            render: (rowData) => <SessionTag status={rowData.status} />,
            sorting: false,
          },
          {
            title: "Ammount",
            render: (rowData) => <span>{rowData.ammount}&euro;</span>,
            sorting: false,
          },
          {
            title: "Date",
            render: (rowData) => {
              return moment(new Date(parseInt(rowData.date))).format(
                "MMMM Do YYYY"
              );
            },
            sorting: false,
          },
        ]}
        data={data.sessionRequests.map((request) => {
          return {
            id: request.id,
            mentor: request.mentor,
            individual: request.individual,
            status: request.status,
            ammount: request.ammount / 100,
            date: request.createdAt,
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
            icon: () => <ArrowForward />,
            tooltip: "Details",
            onClick: (event, rowData: any) =>
              history.push(`/dashboard/sessions/${rowData.id}`),
          },
        ]}
      />
    </div>
  );
};
