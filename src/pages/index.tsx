import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { BrandCleanSvg } from "@components/atoms/svg";
import AppBarComp from "@components/molecules/app-bar";

export default function BoxComponent() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          component="span"
          sx={{ p: 2, border: "1px dashed grey" }}
        >
          <BrandCleanSvg className="brand-sm" name="dd" />
          <Button>Save</Button>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
