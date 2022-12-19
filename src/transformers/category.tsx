import React from "react";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";

export const transformTableCategory = (data: any) => {
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
      label: "Title",
      key: "title",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
  ];
  const items = data.map(({ id, title, updatedAt, createdAt }: any) => ({
    id,
    title,
  }));
  console.log({ items, header, data });
  return {
    items,
    header,
  };
};
