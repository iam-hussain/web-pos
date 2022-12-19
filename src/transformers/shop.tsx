import React from "react";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";

const ShopTableActionCell = (id: any) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <Button
        variant="text"
        component="button"
        sx={{
          margin: 0,
          padding: 0,
          minWidth: "auto",
        }}
        onClick={() => router.push(`/outlet/${id}`)}
      >
        View
      </Button>
      {/* <Button
        variant="text"
        component="button"
        onClick={() => router.push(`/outlet/${id}/product`)}
      >
        Products
      </Button> */}
    </Box>
  );
};

export const transformTableShop = (data: any) => {
  const header = [
    {
      id: 1,
      label: "ID",
      key: "id",
      disablePadding: false,
      numeric: true,
      sortable: false,
    },
    {
      id: 2,
      label: "Name",
      key: "name",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
    {
      id: 3,
      label: "Slug",
      key: "slug",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
    {
      id: 4,
      label: "Last update at",
      key: "updatedAt",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
    {
      id: 5,
      label: "Created at",
      key: "updatedAt",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
    {
      id: 6,
      label: "Action",
      key: "action",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
  ];
  const items = data.map(({ id, name, slug, updatedAt, createdAt }: any) => ({
    id,
    name,
    slug,
    updatedAt,
    createdAt,
    action: ShopTableActionCell(id),
  }));
  return {
    items,
    header,
  };
};
