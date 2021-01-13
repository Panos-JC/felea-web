import { Grid, makeStyles, Typography } from "@material-ui/core";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import React from "react";
import { useParams } from "react-router-dom";
import { useProductQuery } from "../../../generated/graphql";
import { GeneralCard } from "../../shared/generalCard/GeneralCard";
import { Layout } from "../../shared/layout/Layout";
import { Loading } from "../../shared/loading/Loading";
import { ProductCard } from "../productCard/ProductCard";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: theme.spacing(2),
  },
}));

interface ProductPageProps {}

export const ProductPage: React.FC<ProductPageProps> = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useProductQuery({
    variables: { productId: parseInt(id) },
  });

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <Typography>{error?.message}</Typography>;
  }

  return (
    <Layout maxWidth="lg">
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={4}>
          <ProductCard product={data.product} extended={false} />
        </Grid>
        <Grid item xs={8}>
          <GeneralCard title="Description">
            {convertFromRaw(
              JSON.parse(data.product.descriptionRichText)
            ).getPlainText() && (
              <Editor
                readOnly
                onChange={(editorState) => null}
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(data.product.descriptionRichText))
                )}
              />
            )}
          </GeneralCard>
        </Grid>
      </Grid>
    </Layout>
  );
};
