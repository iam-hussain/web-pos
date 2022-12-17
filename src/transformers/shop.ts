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
  ];
  const items = data.map(({ id, name, slug, updatedAt, createdAt }: any) => [
    id,
    name,
    slug,
    updatedAt,
    createdAt,
  ]);
  return {
    items,
    header,
  };
};
