import {
  Button,
  ButtonProps,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  // buttonSuccess: {
  //   backgroundColor: green[500],
  //   "&:hover": {
  //     backgroundColor: green[700],
  //   },
  // },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  text?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  text,
  ...rest
}) => {
  const classes = useStyles();
  return (
    // <Button {...rest} disabled={loading}>
    //   {loading && <CircularProgress size={14} />}
    //   {!loading && text}
    // </Button>
    <div className={classes.wrapper}>
      <Button
        variant="contained"
        color="primary"
        // className={buttonClassname}
        disabled={loading}
        {...rest}
        // onClick={handleButtonClick}
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
