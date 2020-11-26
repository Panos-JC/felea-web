import {
  makeStyles,
  Card,
  Typography,
  Fab,
  TextField,
  Button,
  Grow,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LoggedInMentorDocument,
  useSetMottoMutation,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    padding: theme.spacing(2),
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    overflow: "initial",
  },
  fab: {
    position: "absolute",
    top: theme.spacing(1),
    right: -theme.spacing(2),
  },
  icon: {
    transition: "all 0.3s",
  },
  rotate: {
    transform: "rotate(45deg)",
  },
  formWrapper: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "70%",
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

type Inputs = {
  motto: string;
};

interface MottoProps {
  editable?: boolean;
  motto: string | null | undefined;
}

export const Motto: React.FC<MottoProps> = ({ editable = false, motto }) => {
  const classes = useStyles();

  // state
  const [edit, setEdit] = useState<boolean>(false);

  // GraphQL
  const [setMotto] = useSetMottoMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);

    const { data } = await setMotto({
      variables: { motto: formData.motto },
      refetchQueries: [{ query: LoggedInMentorDocument }],
    });

    if (data?.setMotto.mentor) {
      setEdit(false);
    }
  };

  return (
    <Card className={classes.card}>
      {editable && (
        <Fab
          onClick={() => setEdit(!edit)}
          className={classes.fab}
          size="small"
          color="primary"
        >
          <Add className={`${classes.icon} ${edit && classes.rotate}`} />
        </Fab>
      )}
      <Grow in={edit} mountOnEnter unmountOnExit>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.formWrapper}>
              <TextField
                inputRef={register}
                className={classes.input}
                autoComplete="off"
                label="Motto"
                name="motto"
                placeholder="Your motto"
                variant="outlined"
                size="small"
                defaultValue={motto}
              />
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Grow>
      <Typography>"{motto}"</Typography>
    </Card>
  );
};
