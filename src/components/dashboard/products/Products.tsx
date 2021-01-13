import { Avatar, makeStyles, Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useState } from "react";
import {
  ProductsDocument,
  useDeleteProductMutation,
  useProductsQuery,
} from "../../../generated/graphql";
import { Loading } from "../../shared/loading/Loading";
import { PageTitle } from "../pageTitle/PageTitle";
import moment from "moment";
import { DeleteOutline } from "@material-ui/icons";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";

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
  icon: {
    color: theme.palette.error.light,
  },
}));

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
  const classes = useStyles();

  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");

  // GraphQL
  const { data, loading } = useProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    const { data } = await deleteProduct({
      variables: { productId: id },
      refetchQueries: [{ query: ProductsDocument }],
    });

    if (data?.deleteProduct.errorMsg) {
      setMessage(data.deleteProduct.errorMsg);
      setOpenSnackBar(true);
    }
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle
        title="Products"
        action="Create Product"
        to="/dashboard/products/new"
      />
      <MaterialTable
        title=""
        columns={[
          {
            title: "ID",
            field: "id",
          },
          {
            title: "Title",
            render: (rowData) => (
              <div className={classes.nameCell}>
                <Avatar
                  variant="square"
                  src={rowData.image || ""}
                  className={classes.avatar}
                />
                <div>
                  {/* <Link
                    className={classes.link}
                    color="inherit"
                    component={RouterLink}
                    to={`/dashboard/users/admin/${rowData.id}`}
                    variant="h6"
                  >
                    {rowData.title}
                  </Link> */}
                  {rowData.title}
                </div>
              </div>
            ),
          },
          {
            title: "Price",
            render: (rowData) => <Typography>&euro;{rowData.price}</Typography>,
          },
          {
            title: "Created At",
            render: (rowData) => (
              <Typography>
                {moment(rowData.createdAt, "x").format("MMM Do YY")}
              </Typography>
            ),
          },
        ]}
        data={data.products.map((product) => {
          return {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            createdAt: product.createdAt,
          };
        })}
        actions={[
          {
            icon: () => <DeleteOutline className={classes.icon} />,
            tooltip: "Delete Product",
            onClick: (event, rowData: any) => handleDelete(rowData.id),
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
      <GeneralSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackBar}
        message={message}
        type="error"
      />
    </>
  );
};
