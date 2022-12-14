import React from "react";
import Grid from "@mui/material/Grid";
import { BrandCleanSvg } from "@components/atoms/svg";

function Island({ children }: any) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="start"
      style={{ minHeight: "100vh", paddingTop: 16, paddingBottom: 16 }}
    >
      <Grid
        item
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BrandCleanSvg className="svg-mid" />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        xs
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default Island;
