import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  CompaniesDocument,
  useCreateCompanyMutation,
} from "../../../../../generated/graphql";
import { PageTitle } from "../../../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
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
  const [value, setValue] = useState<string>();
  const [error, setError] = useState<string>("");

  // GraphQL
  const [createCompany, { loading }] = useCreateCompanyMutation();

  const { register, handleSubmit, control, errors } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const { data } = await createCompany({
      variables: {
        input: { name: formData.name, accounts: parseInt(formData.accounts) },
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
            size="small"
            label="Name"
            name="name"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Number of accounts</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              defaultValue="2"
              name="accounts"
              as={
                <RadioGroup
                  aria-label="promoting"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="10" control={<Radio />} label="10" />
                  <FormControlLabel value="20" control={<Radio />} label="20" />
                  <FormControlLabel value="30" control={<Radio />} label="30" />
                </RadioGroup>
              }
            />
          </FormControl>
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
    </>
  );
};
