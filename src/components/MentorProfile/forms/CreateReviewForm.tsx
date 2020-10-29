import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ReviewInput,
  useCreateReviewMutation,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  iconHover: {
    color: theme.palette.primary.dark,
  },
  rating: {
    marginBottom: theme.spacing(2),
  },
}));

type Inputs = {
  review: string;
  rating: number;
};

interface CreateReviewFormProps {
  id: number;
}

export const CreateReviewForm: React.FC<CreateReviewFormProps> = ({ id }) => {
  const classes = useStyles();

  const [createReview, { data }] = useCreateReviewMutation();

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  useEffect(() => {
    register({ name: "rating" }, { required: true });
  }, [register]);

  const onSubmit = async (formData: Inputs) => {
    const input: ReviewInput = {
      message: formData.review,
      rating: formData.rating,
      mentorId: id,
    };
    console.log(formData);

    console.log(input);

    await createReview({ variables: { input } });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="rating"
        className={classes.rating}
        classes={{ iconFilled: classes.icon, iconHover: classes.iconHover }}
        onChange={(event, newValue) => {
          setValue("rating", newValue!);
        }}
      />
      <TextField
        className={classes.input}
        inputRef={register}
        name="review"
        label="Review"
        multiline
        rows={4}
        variant="outlined"
      />
      {data && data.createReview.errorMsg && (
        <Typography component="div" color="error" variant="caption">
          {data.createReview.errorMsg}
        </Typography>
      )}
      <Button
        color="primary"
        variant="contained"
        type="submit"
        disableElevation
      >
        Submit
      </Button>
    </form>
  );
};
