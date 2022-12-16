import * as React from "react";
import { Box } from "@mui/material";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";
import ShopCard from "@components/atoms/shop-card";

function Home() {
  return (
    <GenericLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ShopCard hed={"AMC Doctor's canteen"} dek={"Arunai Medical college"} />
        <ShopCard hed={"AMC Doctor's canteen"} dek={"Arunai Medical college"} />
        <ShopCard hed={"AMC Doctor's canteen"} dek={"Arunai Medical college"} />
        <ShopCard hed={"AMC Doctor's canteen"} dek={"Arunai Medical college"} />
        <ShopCard hed={"AMC Doctor's canteen"} dek={"Arunai Medical college"} />
      </Box>
    </GenericLayout>
  );
}

export default withAuthorization(Home, "shouldNotBeAnyOne");
