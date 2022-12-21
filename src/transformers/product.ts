export const transformTableProduct = (data: any) => {
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
    {
      id: 3,
      label: "Price",
      key: "price",
      disablePadding: false,
      numeric: true,
      sortable: false,
    },
    {
      id: 4,
      label: "Category Id",
      key: "categoryId",
      disablePadding: false,
      numeric: true,
      sortable: false,
    },
    {
      id: 5,
      label: "Category Title",
      key: "categoryTitle",
      disablePadding: false,
      numeric: false,
      sortable: false,
    },
  ];
  const items = data.map(({ id, title, price, category }: any) => ({
    id,
    title,
    price,
    categoryId: category.id,
    categoryTitle: category.title,
  }));
  return {
    items,
    header,
  };
};
