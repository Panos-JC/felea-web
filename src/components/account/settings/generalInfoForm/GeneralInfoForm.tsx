import { Grid, makeStyles, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { GeneralCard } from "../../../generalCard/GeneralCard";
import { countries } from "../../../../utils/countries";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import {
  MeDocument,
  useUpdateIndividualInfoMutation,
} from "../../../../generated/graphql";
import { GeneralSnackbar } from "../../../generalSnackbar/GeneralSnackbar";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
}));

type Inputs = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
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

  // GraphQL
  const [updateInfo, { loading }] = useUpdateIndividualInfoMutation();

  const { register, handleSubmit, control } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const { data } = await updateInfo({
      variables: { firstName: formData.firstName, lastName: formData.lastName },
      refetchQueries: [{ query: MeDocument }],
    });

    if (data?.updateIndividualInfo.errorMsg) {
      setType("error");
      setMessage(data.updateIndividualInfo.errorMsg);
      setOpen(true);
    } else if (data?.updateIndividualInfo.individual) {
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
              inputRef={register}
              className={classes.input}
              value={email}
              variant="outlined"
              size="small"
              name="email"
              label="Email"
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="country"
              control={control}
              as={
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  // defaultValue={[top100Films[13]]}
                  filterSelectedOptions
                  ChipProps={{ size: "small" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Country"
                      placeholder="Type your country"
                      size="small"
                    />
                  )}
                />
              }
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              inputRef={register}
              className={classes.input}
              variant="outlined"
              size="small"
              name="city"
              label="City"
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
