import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";

import Table from "@components/atoms/table";
// GET_SHOP_FOR_TABLE;
function Dashboard() {
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
          header={[
            {
              id: 1,
              label: "ID",
              key: "id",
              disablePadding: false,
              numeric: true,
              sortable: true,
            },
            {
              id: 2,
              label: "Name",
              key: "name",
              disablePadding: false,
              numeric: false,
              sortable: true,
            },
            {
              id: 3,
              label: "Date",
              key: "date",
              disablePadding: false,
              numeric: false,
              sortable: false,
            },
          ]}
          items={[
            ["1", "New", "12:22/23"],
            ["2", "New", "12:22/23"],
          ]}
        />
      </Box>
    </GenericLayout>
  );
}

Dashboard.getInitialProps = async (ctx: any) => {
  console.log({ ctx });
};

export default withAuthorization(Dashboard, "shouldBeUser");
