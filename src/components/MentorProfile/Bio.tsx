import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  MeDocument,
  MentorDocument,
  useSetBioMutation,
} from "../../generated/graphql";
import { GeneralCard } from "./GeneralCard";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

interface BioProps {
  bio: string | null | undefined;
  editable: boolean;
}

export const Bio: React.FC<BioProps> = ({ bio, editable }) => {
  const classes = useStyles();

  // state
  const [dialogOpen, setDialogOpen] = useState(false);
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
      refetchQueries: [{ query: MeDocument }],
    });
    setDialogOpen(false);
  };

  return (
    <GeneralCard title="About">
      <div className={classes.wrapper}>
        {editable && (
          <IconButton
            onClick={() => setDialogOpen(true)}
            className={classes.editIcon}
            size="small"
            color="secondary"
          >
            <Edit />
          </IconButton>
        )}
        <Typography variant="body2" color="textSecondary">
          {bio}
        </Typography>
      </div>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle id="simple-dialog-title">Add bio</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            autoFocus
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </GeneralCard>
  );
};
