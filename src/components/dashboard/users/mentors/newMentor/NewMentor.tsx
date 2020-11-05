import {
  Button,
  Card,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGenerateMentorMutation } from "../../../../../generated/graphql";
import { PageTitle } from "../../../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

type FormData = {
  email: string;
};

interface NewMentorProps {}

export const NewMentor: React.FC<NewMentorProps> = () => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState<boolean>(false);

  // GraphQL
  const [generateMentor, { data, loading }] = useGenerateMentorMutation();

  // Handle form
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    console.log(formData);

    await generateMentor({ variables: { email: formData.email } });
    setOpen(true);
  };

  return (
    <>
      <PageTitle title="Add New Mentor" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card className={classes.card}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                inputRef={register}
                name="email"
                className={classes.input}
                variant="outlined"
                size="small"
                label="Mentor's Email Address"
                placeholder="Ex: email@email.com"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                disableElevation
                disabled={loading}
              >
                Send
              </Button>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <Typography variant="subtitle2">Info</Typography>
            <Typography variant="body2">
              By submitting this form, an email will be sent to the submitted
              email, containing a registration link that works only once and is
              active for 7 days.
            </Typography>
            <Typography variant="body2">
              Make sure the email you provide is correct.
            </Typography>
          </Card>
        </Grid>
      </Grid>
      {data && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={data.generateMentor.emailSent ? "success" : "error"}
            variant="filled"
          >
            {data.generateMentor.errorMsg
              ? data.generateMentor.errorMsg
              : "Email was sent!"}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
