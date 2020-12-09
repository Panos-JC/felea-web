import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDeleteCompanyMutation } from "../../../generated/graphql";
import { GeneralCard } from "../../shared/generalCard/GeneralCard";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";

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
}));

interface DeleteCompanyCardProps {
  companyName: string;
  companyId: number;
}

export const DeleteCompanyCard: React.FC<DeleteCompanyCardProps> = ({
  companyName,
  companyId,
}) => {
  const classes = useStyles();

  const history = useHistory();

  // State
  const [open, setOpen] = useState(false);
  const [filledName, setFilledName] = useState("");
  const [disabled, setDisabled] = useState(true);

  // Snackbar State
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [deleteCompany, { loading }] = useDeleteCompanyMutation();

  useEffect(() => {
    if (companyName === filledName) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [companyName, filledName]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await deleteCompany({ variables: { companyId } });

    if (data?.deleteCompany.deleted) {
      history.goBack();
    }

    if (data?.deleteCompany.errorMsg) {
      setMessage(data.deleteCompany.errorMsg);
      setSnackBarOpen(true);
    }
  };

  return (
    <>
      <GeneralCard
        title="Danger Zone"
        subtitle="Irreversible and destructive actions"
      >
        <Typography variant="subtitle2">Delete Company</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Once you delete a company, there is no going back. Please be certain.
        </Typography>
        <Button
          onClick={() => setOpen(true)}
          classes={{ root: classes.deleteBtnRoot }}
          className={classes.deletBtn}
          variant="contained"
          disableElevation
        >
          Delete Company
        </Button>
      </GeneralCard>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>If you delete this company:</Typography>
          <Typography gutterBottom>
            - All company data will be deleted.
          </Typography>
          <TextField
            name="email"
            label="Company Name"
            placeholder="Enter company name to confirm"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            value={filledName}
            onChange={(event) => setFilledName(event.target.value)}
          />
          <Typography variant="caption">{companyName}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ root: classes.deleteBtnRoot }}
            onClick={handleDelete}
            variant="contained"
            disableElevation
            disabled={disabled || loading}
          >
            Delete Company
          </Button>
          <Button onClick={handleClose} variant="contained" disableElevation>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <GeneralSnackbar
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={message}
        type="error"
      />
    </>
  );
};
