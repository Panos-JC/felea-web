import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import React, { Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminFragment,
  IndividualsDocument,
  useAssignFacilitatorMutation,
} from "../../../../../generated/graphql";
import { ModalActions } from "../../../../../redux/actions/modalActions";
// import { hideModal } from "../../../../../redux/actions/modalActions";
import { AppState } from "../../../../../redux/reducers/rootReducer";

interface AssignFacilitatorDialogProps {
  admins: AdminFragment[];
}

export const AssignFacilitatorDialog: React.FC<AssignFacilitatorDialogProps> = ({
  admins,
}) => {
  // Redux
  const { modalOpen, individual } = useSelector(
    (state: AppState) => state.modal
  );
  const modalDispatch = useDispatch<Dispatch<ModalActions>>();

  const [assignFacilitator] = useAssignFacilitatorMutation();

  const { control, getValues } = useForm<{ admin: number }>();

  const handleClose = () => {
    modalDispatch({ type: "HIDE_MODAL" });
  };

  const handleAssign = async () => {
    const adminId = getValues("admin");
    const { data } = await assignFacilitator({
      variables: { adminId, individualId: individual!.id },
      refetchQueries: [{ query: IndividualsDocument }],
    });

    if (data?.assignFacilitator) {
      handleClose();
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Assign Facilitator</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Asign a facilitator for{" "}
          <Typography component="span" variant="subtitle2" color="textPrimary">
            {`${individual?.firstName} ${individual?.lastName}`}
          </Typography>{" "}
          Select an admin from the dropdown menu.
        </DialogContentText>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Admin</InputLabel>
          <Controller
            control={control}
            name="admin"
            // defaultValue={
            //   data?.me?.mentor?.availableDayUntill || "Friday"
            // }
            render={({ onChange, value }) => (
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={value || ""}
                onChange={onChange}
                label="Admin"
                name="admin"
              >
                {admins.map((admin) => (
                  <MenuItem
                    key={admin.id}
                    value={admin.id}
                  >{`${admin.firstName} ${admin.lastName}`}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAssign} color="primary">
          Assign Facilitator
        </Button>
      </DialogActions>
    </Dialog>
  );
};
