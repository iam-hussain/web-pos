import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      <Fade
        in={true}
        style={{
          transitionDelay: "300ms",
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
    </Box>
  );
}
