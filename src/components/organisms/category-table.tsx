import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORY } from "@graphql/query";
import { CATEGORY_DELETE } from "@graphql/mutation";
import Table from "@components/atoms/table";
import { transformTableCategory } from "@transformers/category";
import Modal from "@components/atoms/modal";
import CategoryForm from "./category-form";
import { useDispatch } from "react-redux";
import { openAlert } from "@reducers/alertSlice";

function CategoryTable({ shopId }: any) {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<[]>([]);
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = React.useState<any>({});

  const [deleteCategory] = useMutation(CATEGORY_DELETE);
  const { data, refetch } = useQuery(GET_CATEGORY, {
    variables: {
      shopId,
    },
  });

  const handleCategoryChange = (input: string) => {
    setOpen(false);
    setSelected([]);
    refetch();
    console.log({ input });
    if (input === "create") {
      dispatch(
        openAlert({
          severity: "success",
          message: "CATEGORY_CREATED",
        })
      );
    } else {
      dispatch(
        openAlert({
          severity: "success",
          message: "CATEGORY_UPDATE",
        })
      );
    }
  };

  const handleEditCategoryClick = (_: any, selectedItems: any) => {
    if (selectedItems.length > 0) {
      setUpdateData({
        ...selectedItems[0],
      });
      setOpen(true);
    }
  };

  const handleDeleteCategoryClick = async (_: any, selectedItems: any) => {
    if (selectedItems.length > 0) {
      try {
        const { data } = await deleteCategory({
          variables: {
            id: selectedItems[0].id,
            shopId,
          },
        });
        if (data?.categoryDelete) {
          setSelected([]);
          refetch();
          dispatch(
            openAlert({
              severity: "success",
              message: "CATEGORY_DELETED",
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setUpdateData({});
    }
  }, [open]);

  return (
    <>
      <Table
        hed={"Category"}
        disableSelectAllCheckBox
        showCredActions
        shouldSingleSelect
        handleAddActionClick={() => setOpen(true)}
        handleEditActionClick={handleEditCategoryClick}
        handleDeleteActionClick={handleDeleteCategoryClick}
        {...transformTableCategory(data?.getCategories || [])}
        selected={selected}
        setSelected={setSelected}
      />
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Typography
          variant="h5"
          color={"secondary"}
          sx={{
            fontWeight: 500,
            pb: 3,
          }}
        >
          Create Category
        </Typography>
        <CategoryForm
          onSuccess={(data: string) => handleCategoryChange(data)}
          btnText={updateData?.id ? "update" : "Create"}
          shopId={shopId}
          {...updateData}
        />
      </Modal>
    </>
  );
}

export default CategoryTable;
