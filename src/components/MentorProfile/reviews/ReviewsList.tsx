import {
  Avatar,
  Card,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useMeQuery, useReviewsByIdQuery } from "../../../generated/graphql";
import { CreateReviewForm } from "../forms/CreateReviewForm";
import { Review } from "./Review";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  newReview: {
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  reviewer: {
    display: "flex",
    flexDirection: "column",
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  card: {
    padding: theme.spacing(2),
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface ReviewsListProps {
  id: number;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ id }) => {
  const classes = useStyles();

  // Remote State
  const { data: meData } = useMeQuery();
  const { data, loading } = useReviewsByIdQuery({
    variables: { mentorId: id },
  });

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.title} variant="h6">
        Reviews {data && <span>({data.reviewsById.length})</span>}
      </Typography>

      {loading && (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
      {meData && meData.me && meData.me.individual && (
        <div className={classes.newReview}>
          <Grid container>
            <Grid item xs={2}>
              <div className={classes.reviewer}>
                <Avatar src={meData.me.avatar || ""} />
                <Typography variant="subtitle2">{`${meData.me.individual.firstName} ${meData.me.individual.lastName}`}</Typography>
                {/* <Typography className={classes.subtitle} variant="caption">
            2 sessions
          </Typography> */}
              </div>
            </Grid>
            <Grid item xs={10}>
              <Card className={classes.card}>
                <CreateReviewForm id={id} />
              </Card>
            </Grid>
          </Grid>
        </div>
      )}

      {data &&
        data.reviewsById &&
        data.reviewsById.map((review) => (
          <Review
            key={review.id}
            firstName={review.individual.firstName}
            lastName={review.individual.lastName}
            avatar={review.individual.user.avatar}
            message={review.message}
            date={review.createdAt}
          />
        ))}
    </div>
  );
};
