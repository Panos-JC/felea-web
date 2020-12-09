import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MeDocument,
  useUpdateAdminInfoMutation,
} from "../../../../generated/graphql";
import { GeneralCard } from "../../../shared/generalCard/GeneralCard";
import { GeneralSnackbar } from "../../../shared/generalSnackbar/GeneralSnackbar";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
}));

type Inputs = {
  firstName: string;
  lastName: string;
};

interface GeneralInfoFormProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
  firstName,
  lastName,
  email,
}) => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"success" | "info" | "warning" | "error">(
    "success"
  );

  const [updateInfo, { loading }] = useUpdateAdminInfoMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const { data } = await updateInfo({
      variables: { firstName: formData.firstName, lastName: formData.lastName },
      refetchQueries: [{ query: MeDocument }],
    });

    if (data?.updateAdminInfo.errorMsg) {
      setType("error");
      setMessage(data.updateAdminInfo.errorMsg);
      setOpen(true);
    } else if (data?.updateAdminInfo.admin) {
      setType("success");
      setMessage("Success");
      setOpen(true);
    }
  };

  return (
    <GeneralCard title="Account Info">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              className={classes.input}
              variant="outlined"
              size="small"
              name="firstName"
              label="First Name"
              defaultValue={firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              className={classes.input}
              variant="outlined"
              size="small"
              name="lastName"
              label="Last Name"
              defaultValue={lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              value={email}
              variant="outlined"
              size="small"
              name="email"
              label="Email"
              disabled
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disableElevation
              disabled={loading}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <GeneralSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        type={type}
      />
    </GeneralCard>
  );
};
