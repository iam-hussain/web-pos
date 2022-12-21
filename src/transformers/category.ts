export const transformTableCategory = (data: any) => {
  const header = [
    {
      id: 1,
      label: "ID",
      key: "id",
      disablePadding: false,
      numeric: true,
      sortable: false,
      width: 20,
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
  const items = data.map(({ id, title }: any) => ({
    id,
    title,
  }));
  return {
    items,
    header,
  };
};

export const transformSelectCategory = (data: any) => {
  return data.map(({ id, title }: any) => ({
    value: id,
    label: title,
  }));
};
