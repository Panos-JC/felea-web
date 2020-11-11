import {
  Button,
  Fab,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  IsProfileCompleteDocument,
  MeDocument,
  useSetBioMutation,
} from "../../../generated/graphql";
import { GeneralCard } from "../generalCard/GeneralCard";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  fab: {
    position: "absolute",
    top: 50,
    left: -20,
  },
  icon: {
    transition: "all 0.3s",
  },
  rotate: {
    transform: "rotate(45deg)",
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

interface BioProps {
  bio: string | null | undefined;
  editable: boolean;
}

export const Bio: React.FC<BioProps> = ({ bio, editable }) => {
  const classes = useStyles();

  // state
  const [edit, setEdit] = useState<boolean>(false);

  const [bioState, setBioState] = useState<string | null | undefined>("");

  // mutation
  const [setBio] = useSetBioMutation();

  // set state when component renders
  useEffect(() => {
    setBioState(bio);
  }, [bio]);

  useEffect(() => {
    console.log("editable ", editable);
  }, [editable]);

  const handleSubmit = async () => {
    const response = await setBio({
      variables: { bio: bioState! },
      refetchQueries: [
        { query: MeDocument },
        { query: IsProfileCompleteDocument },
      ],
    });
    setEdit(false);
  };

  return (
    <GeneralCard title="About">
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
      <div className={classes.wrapper}>
        {edit && (
          <form>
            <TextField
              fullWidth
              autoComplete="off"
              label="Bio"
              name="bio"
              multiline
              rows={10}
              placeholder="Write about your position"
              variant="outlined"
              value={bioState}
              onChange={(e) => setBioState(e.target.value)}
            />
            <Button
              className={classes.button}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="small"
              disableElevation
            >
              Save
            </Button>
          </form>
        )}

        <Typography variant="body2" color="textSecondary">
          {bio}
        </Typography>
      </div>
    </GeneralCard>
  );
};
