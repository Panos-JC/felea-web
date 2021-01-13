import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  makeStyles,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import {
  ProductFragment,
  useCreateOrderMutation,
  useMeQuery,
} from "../../../generated/graphql";
import { Link as RouterLink } from "react-router-dom";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardHeader: {
    "& .MuiCardHeader-title": {
      fontSize: 16,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: 13,
      height: 19,
    },
  },
  chip: {
    marginLeft: "auto",
  },
}));

interface ProductCardProps {
  product: ProductFragment;
  extended?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  extended = true,
}) => {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >();

  const { data } = useMeQuery();
  const [createOrder] = useCreateOrderMutation();

  const handleOrder = async () => {
    const { data, errors } = await createOrder({
      variables: { productId: product.id },
    });

    if (data?.createOrder) {
      setMessage("Success");
      setType("success");
      setOpenSnackBar(true);
    }

    if (errors) {
      setMessage(errors[0].message);
      setType("error");
      setOpenSnackBar(true);
    }

    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card className={classes.root}>
        {extended ? (
          <CardActionArea component={RouterLink} to={`/product/${product.id}`}>
            <CardHeader
              className={classes.cardHeader}
              title={product.title}
              subheader={product.subtitle}
            />
            <CardMedia
              className={classes.media}
              image={product.image}
              title="Paella dish"
            />
            {extended && (
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description.slice(0, 250)}
                </Typography>
              </CardContent>
            )}
          </CardActionArea>
        ) : (
          <>
            <CardHeader
              className={classes.cardHeader}
              title={product.title}
              subheader={product.subtitle}
            />
            <CardMedia
              className={classes.media}
              image={product.image}
              title="Paella dish"
            />
            {extended && (
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description.slice(0, 250)}
                </Typography>
              </CardContent>
            )}
          </>
        )}
        <CardActions disableSpacing>
          {data?.me?.individual && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => setOpenDialog(true)}
            >
              Order
            </Button>
          )}
          <Chip label={`${product.price}\u20AC`} className={classes.chip} />
        </CardActions>
      </Card>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <DialogTitle>Place Order</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            If you are interested in this product, you can place an order. Once
            we receive an order we will get in touch with you
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOrder}
            color="primary"
            variant="contained"
            disableElevation
          >
            Order
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <GeneralSnackbar
        open={openSnackbar}
        setOpen={setOpenSnackBar}
        message={message}
        type={type}
      />
    </>
  );
};
