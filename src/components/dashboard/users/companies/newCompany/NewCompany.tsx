import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  CompaniesDocument,
  useCreateCompanyMutation,
} from "../../../../../generated/graphql";
import { PageTitle } from "../../../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: "50%",
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  button: {
    display: "block",
  },
}));

type Inputs = {
  name: string;
  accounts: string;
};

interface NewCompanyProps {}

export const NewCompany: React.FC<NewCompanyProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  // State
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);

  // GraphQL
  const [createCompany, { loading }] = useCreateCompanyMutation();

  const { register, handleSubmit, errors, getValues } = useForm<Inputs>();

  const onSubmit = async () => {
    setOpen(true);
  };

  const handleCreate = async () => {
    const { accounts, name } = getValues();

    const { data } = await createCompany({
      variables: {
        input: { name, accounts: parseInt(accounts) },
      },
      refetchQueries: [{ query: CompaniesDocument }],
    });

    if (data?.createCompany.errorMsg) {
      setError(data.createCompany.errorMsg);
    } else if (data?.createCompany.company) {
      history.push("/dashboard/users/companies");
    }
  };

  return (
    <>
      <PageTitle title="Create Company" />
      {error}
      <Card className={classes.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={register({ required: true })}
            error={errors.name ? true : false}
            helperText={errors.name ? "Name is required" : null}
            className={classes.input}
            variant="outlined"
            placeholder="e.g 10"
            size="small"
            label="Name"
            name="name"
          />
          <TextField
            inputRef={register({ required: true })}
            error={errors.accounts ? true : false}
            helperText={errors.accounts ? "Field required" : null}
            className={classes.input}
            type="number"
            label="Number of Accounts"
            size="small"
            name="accounts"
            variant="outlined"
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            disableElevation
          >
            Generate
          </Button>
        </form>
      </Card>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm Company Creation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Company name: <strong>{getValues().name}</strong> <br />
            Number of accounts: <strong>{getValues().accounts}</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
