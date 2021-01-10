import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useProductsQuery } from "../../generated/graphql";
import { Layout } from "../shared/layout/Layout";
import { Loading } from "../shared/loading/Loading";
import { ProductCard } from "./productCard/ProductCard";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  container: {
    marginTop: theme.spacing(2),
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

interface ProductsProps {}

export const Products: React.FC<ProductsProps> = () => {
  const classes = useStyles();

  const { data, loading } = useProductsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <Layout maxWidth="md">
      <Grid container spacing={2} className={classes.container}>
        {data.products.map((product) => (
          <Grid item xs={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
