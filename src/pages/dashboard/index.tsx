import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";

import Table from "@components/atoms/table";
import { transformTableShop } from "@transformers/shop";
import { initializeApollo } from "@graphql/client";
import { GET_SHOP_FOR_TABLE } from "@graphql/query";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { getCookie } from "cookies-next";

function Dashboard({ tableShop }: any) {
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
          Dashboard
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
          {...tableShop}
        />
      </Box>
    </GenericLayout>
  );
}

Dashboard.getInitialProps = async (ctx: any) => {
  const token = getCookie(HEADER_TOKEN_KEY, ctx);
  const apolloClient = initializeApollo();
  const fetchData = await apolloClient.query({
    query: GET_SHOP_FOR_TABLE,
    context: {
      headers: {
        [HEADER_TOKEN_KEY]: token,
      },
    },
  });
  const shops = fetchData?.data?.getShops || undefined;
  return {
    shops,
    tableShop: transformTableShop(shops),
  };
};

export default withAuthorization(Dashboard, "shouldBeUser");
