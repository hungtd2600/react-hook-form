import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Loading;
