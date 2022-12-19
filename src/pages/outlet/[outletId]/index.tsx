import * as React from "react";
import { Box, Typography } from "@mui/material";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";

import CategoryTable from "@components/organisms/category-table";
import { initializeApollo } from "@graphql/client";
import { GET_SHOP } from "@graphql/query";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { getCookie } from "cookies-next";
import { pushRouter } from "@helpers/serverSide";

function OneOutlet({ shop }: any) {
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
        <div>
          <Typography
            variant="h5"
            color={"secondary"}
            sx={{
              fontWeight: 500,
            }}
          >
            {shop.name}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color={"GrayText"}
            align="center"
          >
            {shop.slug}
          </Typography>
        </div>
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
        <CategoryTable shopId={shop.id} />
      </Box>
    </GenericLayout>
  );
}

OneOutlet.getInitialProps = async (ctx: any) => {
  const { outletId } = ctx.query;
  if (isNaN(Number(outletId))) {
    pushRouter(ctx, "/outlet");
  }
  const token = getCookie(HEADER_TOKEN_KEY, ctx);
  const apolloClient = initializeApollo();
  const fetchData = await apolloClient.query({
    query: GET_SHOP,
    context: {
      headers: {
        [HEADER_TOKEN_KEY]: token,
      },
    },
    variables: {
      shopId: Number(outletId),
    },
  });
  const shop = fetchData?.data?.getShop || {};
  if (!shop.id) {
    pushRouter(ctx, "/outlet");
  }
  return {
    shop,
  };
};

export default withAuthorization(OneOutlet, "shouldBeUser");
