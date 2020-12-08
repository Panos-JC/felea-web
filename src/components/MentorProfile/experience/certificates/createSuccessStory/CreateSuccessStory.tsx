import MomentUtils from "@date-io/moment";
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CertificatesDocument,
  CertificateInput,
  useCreateCertificateMutation,
} from "../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  form: { marginBottom: 20 },
  picker: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
}));

type Inputs = {
  title: string;
  organization: string;
  date: string;
  description: string;
};

interface CreateSuccessStoryProps {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateSuccessStory: React.FC<CreateSuccessStoryProps> = ({
  setEdit,
}) => {
  const classes = useStyles();

  const [createCertificate] = useCreateCertificateMutation();

  const { register, handleSubmit, errors, control } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const input: CertificateInput = {
      title: formData.title,
      organization: formData.organization,
      date: formData.date,
      description: formData.description,
    };

    const { data } = await createCertificate({
      variables: { input },
      refetchQueries: [{ query: CertificatesDocument }],
    });

    if (data?.createCertificate.certificate) {
      setEdit(false);
    }
  };

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        Add Success Story
      </Typography>
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
            />
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Controller
                control={control}
                name="date"
                defaultValue={new Date()}
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
              placeholder="By sharing your achievements, you can provide motivation and gain customer trust."
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
