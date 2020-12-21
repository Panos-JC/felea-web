import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles, Avatar, Link } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";
import { useAdminsQuery } from "../../../../generated/graphql";
import MaterialTable from "material-table";
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
  spinner: {
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

interface AdminTableProps {}

export const AdminTable: React.FC<AdminTableProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { data, loading } = useAdminsQuery();

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
              <Avatar src={rowData.avatar || ""} className={classes.avatar} />
              <div>
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to={`/dashboard/users/admin/${rowData.id}`}
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
      ]}
      data={data.admins.map((admin) => {
        return {
          id: admin.id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          avatar: admin.user.avatar,
          email: admin.user.email,
          emailActive: admin.user.activated,
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
            history.push(`/dashboard/users/admin/${rowData.id}`),
        },
      ]}
    />
  );
};
