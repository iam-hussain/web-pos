import PropTypes from "prop-types";
import * as React from "react";
import GenericNavBar from "@components/molecules/generic-navbar";
import { Box, Container } from "@mui/material";

function GenericLayout({
  children,
  container = false,
  noPadding = false,
}: any) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        paddingBottom: 3,
      }}
    >
      <GenericNavBar />
      {container ? (
        <Container
          sx={{
            backgroundColor: "Background",
            height: "100%",
            padding: noPadding ? 0 : 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {children}
        </Container>
      ) : (
        <Box
          sx={{
            backgroundColor: "Background",
            height: "100%",
            padding: noPadding ? 0 : 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

GenericLayout.propTypes = {
  children: PropTypes.any,
  container: PropTypes.bool,
  noPadding: PropTypes.bool,
};

export default GenericLayout;
