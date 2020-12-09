import {
  makeStyles,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  TextField,
  DialogActions,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GeneralCard } from "../../shared/generalCard/GeneralCard";

const useStyles = makeStyles((theme) => ({
  deletBtn: {
    marginTop: theme.spacing(2),
  },
  deleteBtnRoot: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  highlight: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
  },
  userWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
}));

interface DeleteEntityCardProps {
  userEmail: string;
  avatar: string;
  name: string;
  handleDelete: () => Promise<void>;
}

export const DeleteEntityCard: React.FC<DeleteEntityCardProps> = ({
  userEmail,
  avatar,
  name,
  handleDelete,
}) => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState(false);
  const [filledEmail, setFilledEmail] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (userEmail === filledEmail) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [userEmail, filledEmail]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <GeneralCard
        title="Danger Zone"
        subtitle="Irreversible and destructive actions"
      >
        <Typography variant="subtitle2">Delete User</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Once you delete a user, there is no going back. Please be certain.
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          classes={{ root: classes.deleteBtnRoot }}
          className={classes.deletBtn}
          variant="contained"
          disableElevation
        >
          Delete User
        </Button>
      </GeneralCard>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>If you delete this user:</Typography>
          <Typography gutterBottom>
            - All user's data will be deleted.
          </Typography>
          <Typography gutterBottom>
            - All user's associated session requests will be deleted.
          </Typography>
          <Typography gutterBottom>
            - All user's reviews will be deleted.
          </Typography>
          <Typography gutterBottom>
            - This user will not have access to the platform.
          </Typography>
          <Typography gutterBottom className={classes.highlight}>
            This action cannot be undone!
          </Typography>
          <div className={classes.userWrapper}>
            <Avatar className={classes.avatar} src={avatar} />
            <Typography>{name}</Typography>
          </div>

          <TextField
            name="email"
            label="User's Email"
            placeholder="Enter user's email to confirm"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            value={filledEmail}
            onChange={(event) => setFilledEmail(event.target.value)}
          />
          <Typography variant="caption">{userEmail}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ root: classes.deleteBtnRoot }}
            onClick={handleDelete}
            variant="contained"
            disableElevation
            disabled={disabled}
          >
            Delete User
          </Button>
          <Button onClick={handleClose} variant="contained" disableElevation>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
