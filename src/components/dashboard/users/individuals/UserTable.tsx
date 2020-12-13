import React, { Dispatch } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  makeStyles,
  Avatar,
  Link,
  Chip,
  Typography,
  Button,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";
import {
  IndividualFragment,
  useIndividualsQuery,
} from "../../../../generated/graphql";
import { ModalActions } from "../../../../redux/actions/modalActions";
import { useDispatch } from "react-redux";
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
    background: fade(theme.palette.warning.light, 0.4),
    color: theme.palette.warning.dark,
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

type IRowData = {
  id: number;
};

interface UserTableProps {}

export const UserTable: React.FC<UserTableProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const modalDispatch = useDispatch<Dispatch<ModalActions>>();

  const { data, loading } = useIndividualsQuery();

  const handleClick = (individual: IndividualFragment) => {
    modalDispatch({ type: "SHOW_MODAL", payload: individual });
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <MaterialTable
      title="Individuals"
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
                  to={`/dashboard/users/individual/${rowData.id}`}
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
          sorting: false,
        },
        {
          title: "Status",
          render: (rowData) => (
            <Chip
              label={rowData.status ? "Premium" : "Free"}
              size="small"
              className={rowData.status ? classes.success : classes.warn}
            />
          ),
          customSort: (a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1),
        },
        {
          title: "Company",
          render: (rowData) => {
            if (rowData.company) {
              return (
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to={`/dashboard/users/company/${rowData.company.id}`}
                  variant="h6"
                >
                  {rowData.company.name}
                </Link>
              );
            }
          },
          customSort: (a, b) =>
            (a.company?.name.length || 0) - (b.company?.name.length || 0),
        },
        {
          title: "Facilitator",
          render: (rowData) => {
            if (rowData.facilitator) {
              return (
                <Typography>{`${rowData.facilitator.firstName} ${rowData.facilitator.lastName}`}</Typography>
              );
            } else {
              return (
                <Button
                  color="primary"
                  size="small"
                  onClick={() => handleClick(rowData.individual)}
                >
                  Assign Facilitator
                </Button>
              );
            }
          },
        },
      ]}
      data={data.individuals.map((individual) => {
        return {
          id: individual.id,
          firstName: individual.firstName,
          lastName: individual.lastName,
          avatar: individual.user.avatar,
          email: individual.user.email,
          status: individual.premium,
          company: individual.company,
          facilitator: individual.facilitator,
          individual,
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
            history.push(`/dashboard/users/individual/${rowData.id}`),
        },
      ]}
    />
  );
};
