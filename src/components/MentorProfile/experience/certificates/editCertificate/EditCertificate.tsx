import MomentUtils from "@date-io/moment";
import { makeStyles, Grid, TextField, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CertificateFieldsFragment,
  CertificateInput,
  CertificatesDocument,
  useUpdateCertificateMutation,
} from "../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  form: { marginBottom: 20 },
  picker: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

type Inputs = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

interface EditCertificateProps {
  values: CertificateFieldsFragment;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCertificate: React.FC<EditCertificateProps> = ({
  values,
  setEdit,
}) => {
  const classes = useStyles();

  // GraphQL
  const [updateCertificate] = useUpdateCertificateMutation();

  const { register, handleSubmit, errors, control } = useForm<Inputs>();
  console.log(moment(new Date(parseInt(values.date))));
  console.log(values.date);

  const onSubmit = async (formData: Inputs) => {
    const input: CertificateInput = {
      title: formData.title,
      organization: formData.organization,
      date: formData.date,
      description: formData.description,
    };

    const { data } = await updateCertificate({
      variables: { id: values.id, input },
      refetchQueries: [{ query: CertificatesDocument }],
    });

    if (data?.updateCertificate.certificate) {
      setEdit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.title ? true : false}
            helperText={errors.title ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            size="small"
            defaultValue={values.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.organization ? true : false}
            helperText={errors.organization ? "Required field" : null}
            autoComplete="off"
            variant="outlined"
            fullWidth
            id="organization"
            label="Organization"
            name="organization"
            size="small"
            defaultValue={values.organization}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
              control={control}
              name="date"
              defaultValue={moment(new Date(values.date))}
              render={({ onChange, value }) => (
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="Date"
                  inputVariant="outlined"
                  value={value}
                  onChange={onChange}
                  size="small"
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.description ? true : false}
            helperText={errors.description ? "Required field" : null}
            autoComplete="off"
            className={classes.description}
            label="Description"
            name="description"
            multiline
            rows={7}
            placeholder="Write about your position"
            variant="outlined"
            size="small"
            defaultValue={values.description}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disableElevation
          >
            Save
          </Button>
          <Button
            className={classes.button}
            onClick={() => setEdit(false)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
