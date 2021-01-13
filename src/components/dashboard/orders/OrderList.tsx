import { Avatar, Link, makeStyles, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";
import { useOrdersQuery } from "../../../generated/graphql";
import { Loading } from "../../shared/loading/Loading";
import { PageTitle } from "../pageTitle/PageTitle";
import { Link as RouterLink, useHistory } from "react-router-dom";
import moment from "moment";
import { ArrowForward } from "@material-ui/icons";

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
  link: {
    fontSize: 14,
  },
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface OrderListProps {}

export const OrderList: React.FC<OrderListProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  const { data, loading } = useOrdersQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Orders" />
      <MaterialTable
        title=""
        columns={[
          {
            title: "Id",
            field: "id",
          },
          {
            title: "User",
            render: (rowData) => (
              <div className={classes.nameCell}>
                <Avatar
                  src={rowData.individual.user.avatar || ""}
                  className={classes.avatar}
                />
                <div>
                  <Link
                    className={classes.link}
                    color="inherit"
                    component={RouterLink}
                    to={`/dashboard/users/admin/${rowData.id}`}
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
          },
          {
            title: "Product",
            render: (rowData) => (
              <div className={classes.nameCell}>
                <Avatar
                  src={rowData.product.image || ""}
                  className={classes.avatar}
                  variant="square"
                />
                <Typography>{rowData.product.title}</Typography>
              </div>
            ),
          },
          {
            title: "Status",
            field: "status",
          },
          {
            title: "Created At",
            render: (rowData) => {
              return moment(new Date(parseInt(rowData.createdAt))).format(
                "MMMM Do YYYY, h:mm:ss a"
              );
            },
          },
        ]}
        data={data.orders.map((order) => {
          return {
            id: order.id,
            individual: order.individual,
            product: order.product,
            status: order.status,
            createdAt: order.createdAt,
          };
        })}
        actions={[
          {
            icon: () => <ArrowForward />,
            tooltip: "Details",
            onClick: (event, rowData: any) =>
              history.push(`/dashboard/order/${rowData.id}`),
          },
        ]}
        options={{
          draggable: false,
          emptyRowsWhenPaging: false,
          pageSize: 10,
          pageSizeOptions: [10, 20],
          actionsColumnIndex: -1,
        }}
      />
    </>
  );
};
