import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";

import Table from "@components/atoms/table";
import { transformTableShop } from "@transformers/shop";
import { initializeApollo } from "@graphql/client";
import { GET_SHOPS_MINI } from "@graphql/query";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { getCookie } from "cookies-next";

function Outlet({ shops }: any) {
  return (
    <GenericLayout container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 3,
        }}
      >
        <Typography
          variant="h5"
          color={"secondary"}
          sx={{
            fontWeight: 500,
          }}
        >
          Outlet / Branch
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Table
          disableSelectCheckBox
          showCredActions
          shouldSingleSelect
          shouldShowToolBar={false}
          {...transformTableShop(shops)}
        />
      </Box>
    </GenericLayout>
  );
}

Outlet.getInitialProps = async (ctx: any) => {
  const token = getCookie(HEADER_TOKEN_KEY, ctx);
  const apolloClient = initializeApollo();
  const fetchData = await apolloClient.query({
    query: GET_SHOPS_MINI,
    context: {
      headers: {
        [HEADER_TOKEN_KEY]: token,
      },
    },
  });
  const shops = fetchData?.data?.getShops || [];
  return {
    shops,
  };
};

export default withAuthorization(Outlet, "shouldBeUser");
