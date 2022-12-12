import React from "react";
import { Alert } from "@mui/material";

const Notification = ({ severity, title }) => {
  return (
    <Alert
      sx={{ position: "fixed", top: "12%", left: "85%", zIndex: "10" }}
      variant="outlined"
      severity={severity}
    >
      {title}
    </Alert>
  );
};

export default Notification;
