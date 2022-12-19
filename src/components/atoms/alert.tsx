import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { closeAlert } from "@reducers/alertSlice";

const AlertComp = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Alert() {
  const { open, severity, message } = useSelector(
    (state: RootState) => state.alert
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlert();
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <AlertComp
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </AlertComp>
      </Snackbar>
    </>
  );
}

Alert.defaultProps = {
  severity: "info",
  open: false,
  message: "",
};

export default Alert;
