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
} from "@material-ui/core";
import React from "react";
import { ProductFragment } from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
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
    },
  },
  chip: {
    marginLeft: "auto",
  },
}));

interface ProductCardProps {
  product: ProductFragment;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
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
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description.slice(0, 250)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" color="primary" disableElevation>
          Order
        </Button>
        <Chip label={`${product.price}\u20AC`} className={classes.chip} />
      </CardActions>
    </Card>
  );
};
