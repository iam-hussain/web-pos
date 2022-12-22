import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CATEGORY } from "@graphql/query";
import { CATEGORY_DELETE } from "@graphql/mutation";
import Table from "@components/atoms/table";
import Modal from "@components/atoms/modal";
import CategoryForm from "./category-form";
import { useDispatch, useSelector } from "react-redux";
import { openAlert } from "@reducers/alertSlice";
import { setCategories, catchCategories } from "@reducers/categorySlice";
import { AppDispatch, RootState } from "@store";

function CategoryTable({ shopId }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, tableCategories } = useSelector(
    (state: RootState) => state.category
  );

  const [selected, setSelected] = React.useState<[]>([]);
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = React.useState<any>({});

  const [deleteMutation] = useMutation(CATEGORY_DELETE);

  const { data, refetch, error } = useQuery(GET_CATEGORY, {
    variables: {
      shopId,
    },
  });

  const handleAlertDispatch = (input: any) => dispatch(openAlert(input));

  useEffect(() => {
    if (data?.getCategories) {
      dispatch(setCategories(data?.getCategories));
    }
    if (error) {
      console.error(error);
      dispatch(catchCategories());
    }
  }, [data, dispatch, error, loading]);

  const handleEntryUpdate = (input: string) => {
    setOpen(false);
    refetch();
    if (input === "create") {
      handleAlertDispatch({
        severity: "success",
        message: "CATEGORY_CREATED",
      });
    } else {
      handleAlertDispatch({
        severity: "success",
        message: "CATEGORY_UPDATE",
      });
    }
  };

  const handleEditClick = (_: any, selectedItems: any) => {
    if (selectedItems.length > 0) {
      setUpdateData({
        ...selectedItems[0],
      });
      setOpen(true);
    }
  };

  const handleDeleteClick = async (_: any, selectedItems: any) => {
    if (selectedItems.length > 0) {
      try {
        const { data } = await deleteMutation({
          variables: {
            id: selectedItems[0].id,
            shopId,
          },
        });
        if (data?.categoryDelete) {
          setSelected([]);
          refetch();
          handleAlertDispatch({
            severity: "success",
            message: "CATEGORY_DELETED",
          });
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
        handleEditActionClick={handleEditClick}
        handleDeleteActionClick={handleDeleteClick}
        {...tableCategories}
        selected={selected}
        setSelected={setSelected}
        loading={loading}
        name={"category"}
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
          {updateData?.id ? "Update Category" : "Create Category"}
        </Typography>
        <CategoryForm
          onSuccess={(data: string) => handleEntryUpdate(data)}
          btnText={updateData?.id ? "update" : "Create"}
          shopId={shopId}
          {...updateData}
        />
      </Modal>
    </>
  );
}

export default CategoryTable;
