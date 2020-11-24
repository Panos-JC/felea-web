import { Grid, TextField, makeStyles, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FieldError,
  useChangeKnownPasswordMutation,
} from "../../../../generated/graphql";
import { GeneralCard } from "../../../generalCard/GeneralCard";
import { GeneralSnackbar } from "../../../generalSnackbar/GeneralSnackbar";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
}));

type Inputs = {
  oldPassword: string;
  newPassword: string;
};

interface SecurityInfoFormProps {}

export const SecurityInfoForm: React.FC<SecurityInfoFormProps> = () => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<FieldError | null>();
  const [type, setType] = useState<"success" | "info" | "warning" | "error">(
    "success"
  );

  // GrapgQL
  const [changePassword, { loading }] = useChangeKnownPasswordMutation();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    const { data } = await changePassword({
      variables: {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      },
    });

    if (
      data?.changeKnownPassword.errors &&
      data?.changeKnownPassword.errors[0].field === "general"
    ) {
      setType("error");
      setMessage(data.changeKnownPassword.errors[0].message);
      setOpen(true);
    } else if (data?.changeKnownPassword.user) {
      setType("success");
      setMessage("Password changed");
      setOpen(true);
      setErrors(null);
      reset();
    } else if (data?.changeKnownPassword.errors) {
      setErrors(data.changeKnownPassword.errors[0]);
    }
  };

  return (
    <GeneralCard title="Security">
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              error={errors?.field === "oldPassword" ? true : false}
              helperText={
                errors?.field === "oldPassword" ? errors.message : null
              }
              className={classes.input}
              type="password"
              variant="outlined"
              size="small"
              name="oldPassword"
              label="Old Password"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              error={errors?.field === "newPassword" ? true : false}
              helperText={
                errors?.field === "newPassword" ? errors.message : null
              }
              className={classes.input}
              type="password"
              variant="outlined"
              size="small"
              name="newPassword"
              label="New Password"
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
