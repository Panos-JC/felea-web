import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface GeneralSnackbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  type?: "success" | "info" | "warning" | "error";
}

export const GeneralSnackbar: React.FC<GeneralSnackbarProps> = ({
  open,
  setOpen,
  type = "success",
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
