import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useOrderQuery,
  useSetStatusMutation,
} from "../../../../generated/graphql";
import { ProductCard } from "../../../products/productCard/ProductCard";
import { GeneralCard } from "../../../shared/generalCard/GeneralCard";
import { GeneralSnackbar } from "../../../shared/generalSnackbar/GeneralSnackbar";
import { Loading } from "../../../shared/loading/Loading";
import { PageTitle } from "../../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    display: "flex",
    alignItems: "center",
  },
  userTitles: {
    marginLeft: theme.spacing(1),
  },
  saveBtn: {
    marginTop: theme.spacing(2),
  },
}));

interface OrderPageProps {}

export const OrderPage: React.FC<OrderPageProps> = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const orderId = parseInt(id);

  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<
    "error" | "success" | "info" | "warning" | undefined
  >();

  const { data, loading } = useOrderQuery({
    variables: { orderId },
  });
  const [setNewStatus] = useSetStatusMutation();

  useEffect(() => {
    if (data) {
      setStatus(data.order.status);
    }
  }, [data]);

  const handleSave = async () => {
    const { data, errors } = await setNewStatus({
      variables: { orderId, status },
    });

    if (errors) {
      setMessage(errors[0].message);
      setType("error");
      setOpen(true);
    }

    if (data?.setStatus) {
      setMessage("Status changed");
      setType("success");
      setOpen(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Order" />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GeneralCard title="Order Info">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>
                    <div className={classes.userWrapper}>
                      <Avatar />
                      <div className={classes.userTitles}>
                        <Typography variant="subtitle2">
                          {`${data.order.individual.firstName} ${data.order.individual.lastName}`}
                        </Typography>
                        <Typography variant="body2">
                          {data.order.individual.user.email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>
                    <Typography>{data.order.id}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>
                    <Typography>
                      {moment(new Date(parseInt(data.order.createdAt))).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>
                    <FormControl variant="outlined">
                      <InputLabel>Status</InputLabel>
                      <Select
                        defaultValue={data.order.status}
                        value={status}
                        onChange={handleChange}
                        label="Status"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="canceled">Canceled</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              className={classes.saveBtn}
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleSave}
            >
              Save
            </Button>
          </GeneralCard>
        </Grid>
        <Grid item xs={3}>
          <ProductCard product={data.order.product} />
        </Grid>
      </Grid>
      <GeneralSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
    </>
  );
};
