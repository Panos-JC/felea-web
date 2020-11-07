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

interface NewCompanyProps {}

export const NewCompany: React.FC<NewCompanyProps> = ({}) => {
  const [value, setValue] = useState<string>();
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Create Company" />
      <Card className={classes.card}>
        <form>
          <TextField
            className={classes.input}
            variant="outlined"
            size="small"
            label="Name"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Number of accounts</FormLabel>
            <RadioGroup
              className={classes.input}
              name="accounts"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
              <FormControlLabel value="10" control={<Radio />} label="10" />
              <FormControlLabel value="20" control={<Radio />} label="20" />
              <FormControlLabel value="30" control={<Radio />} label="30" />
            </RadioGroup>
          </FormControl>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Generate
          </Button>
        </form>
      </Card>
    </>
  );
};
