import * as React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";

export default function ProductForm() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="center"
      gap={0}
      paddingBottom={4}
      paddingTop={1}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
        gap={0}
        paddingBottom={4}
        paddingTop={1}
      >
        <Typography variant="h5" paddingBottom={1}>
          Update Product
        </Typography>
        <Typography variant="body2" component="span" color={"GrayText"}>
          Place to update the product title, price and category
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Price"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Category"
          variant="outlined"
        />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
        >
          <Button
            sx={{
              padding: 1,
              paddingInline: 4,
              marginInline: 2,
            }}
            variant="contained"
            endIcon={<UpdateIcon />}
          >
            Update Product
          </Button>
          <Button
            sx={{
              padding: 1,
              paddingInline: 4,
              marginInline: 2,
            }}
            variant="contained"
            endIcon={<DeleteIcon />}
          >
            Delete Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
