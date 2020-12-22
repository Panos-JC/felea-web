import { Avatar, Chip, Link, makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import { ArrowForward, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAllMentorsQuery } from "../../../../generated/graphql";
import { Loading } from "../../../shared/loading/Loading";

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
  warn: {
    background: fade(theme.palette.error.light, 0.4),
    color: theme.palette.error.dark,
  },
  success: {
    background: fade(theme.palette.success.light, 0.4),
    color: theme.palette.success.dark,
  },
  link: {
    fontSize: 14,
  },
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface MentorTableProps {}

export const MentorTable: React.FC<MentorTableProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { data, loading } = useAllMentorsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <MaterialTable
      title=""
      columns={[
        {
          title: "Name",
          render: (rowData) => (
            <div className={classes.nameCell}>
              <Avatar className={classes.avatar} src={rowData.avatar || ""} />
              <div>
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to={`/mentor/${rowData.id}`}
                  variant="h6"
                >
                  {`${rowData.firstName} ${rowData.lastName}`}
                </Link>
                <div className={classes.email}>{rowData.email}</div>
              </div>
            </div>
          ),
          customFilterAndSearch: (term, rowData) =>
            (
              rowData.firstName.toLowerCase() +
              " " +
              rowData.lastName.toLowerCase()
            ).indexOf(term.toLowerCase()) !== -1 ||
            rowData.email.toLowerCase().indexOf(term.toLowerCase()) !== -1,
        },
        {
          title: "Profile",
          render: (rowData) => {
            if (rowData.profileComplete) {
              return (
                <Chip
                  label="Complete"
                  size="small"
                  className={classes.success}
                />
              );
            } else {
              return (
                <Chip
                  label="Incomplete"
                  size="small"
                  className={classes.warn}
                />
              );
            }
          },
          customSort: (a, b) =>
            a.profileComplete === b.profileComplete
              ? 0
              : a.profileComplete
              ? -1
              : 1,
        },
        {
          title: "Email",
          render: (rowData) => {
            if (rowData.emailActive) {
              return (
                <Chip label="Active" size="small" className={classes.success} />
              );
            } else {
              return (
                <Chip label="Inactive" size="small" className={classes.warn} />
              );
            }
          },
          customSort: (a, b) =>
            a.emailActive === b.emailActive ? 0 : a.emailActive ? -1 : 1,
        },
      ]}
      data={data.allMentors.map((mentor) => {
        return {
          id: mentor.mentor.id,
          firstName: mentor.mentor.firstName,
          lastName: mentor.mentor.lastName,
          email: mentor.mentor.user.email,
          avatar: mentor.mentor.user.avatar,
          profileComplete: mentor.mentor.profileComplete,
          emailActive: mentor.mentor.user.activated,
          sessions: mentor.sessions,
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
          icon: () => <Edit />,
          tooltip: "Edit Mentor",
          onClick: (event, rowData: any) =>
            history.push(`/dashboard/users/mentor/${rowData.id}/edit`),
        },
        {
          icon: () => <ArrowForward />,
          tooltip: "Details",
          onClick: (event, rowData: any) =>
            history.push(`/dashboard/users/mentor/${rowData.id}`),
        },
      ]}
    />
  );
};
