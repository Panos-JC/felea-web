import { Button, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import {
  GetMottoDocument,
  useSetMottoByMentorMutation,
} from "../../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

interface EditMottoProps {
  id: number;
}

export const EditMotto: React.FC<EditMottoProps> = ({ id }) => {
  const classes = useStyles();

  const [setMotto, { loading }] = useSetMottoByMentorMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData: any) => {
    await setMotto({
      variables: { motto: formData.motto, mentorId: id },
      refetchQueries: [
        { query: GetMottoDocument, variables: { mentorId: id } },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register}
        className={classes.input}
        name="motto"
        variant="outlined"
        label="Motto"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
        size="small"
        disabled={loading}
      >
        Save
      </Button>
    </form>
  );
};
