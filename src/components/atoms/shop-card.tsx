import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box, Card, CardMedia, CardContent, Button } from "@mui/material";
import Table from "./table";

function ShopCard({ hed, dek, imageAlt }: any) {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex", width: "100%", flexGrow: 1 }}
      variant="outlined"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {hed}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {dek}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            gap: 3,
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            color={"secondary"}
            type="submit"
            sx={{
              p: 0,
              m: 0,
              minWidth: 0,
            }}
          >
            Edit
          </Button>

          <Button
            variant="text"
            color={"primary"}
            type="submit"
            sx={{
              p: 0,
              m: 0,
              minWidth: 0,
            }}
          >
            View
          </Button>
        </Box>
      </Box>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/open-shop.jpg"
        alt={imageAlt || hed}
      /> */}
    </Card>
  );
}

export default ShopCard;
