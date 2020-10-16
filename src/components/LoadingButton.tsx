import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

interface LoadingButtonProps {
  loading?: boolean;
  text: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  text,
  ...rest
}) => {
  return (
    <Button {...rest}>
      {loading && <CircularProgress size={14} />}
      {!loading && text}
    </Button>
  );
};
