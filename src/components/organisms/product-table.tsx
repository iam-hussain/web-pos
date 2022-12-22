import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT } from "@graphql/query";
import { PRODUCT_DELETE } from "@graphql/mutation";
import Table from "@components/atoms/table";
import { transformTableProduct } from "@transformers/product";
import Modal from "@components/atoms/modal";
import ProductForm from "./product-form";
import { useDispatch } from "react-redux";
import { openAlert } from "@reducers/alertSlice";

function ProductTable({ shopId }: any) {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<[]>([]);
  const [open, setOpen] = React.useState(false);
  const [updateData, setUpdateData] = React.useState<any>({});

  const [deleteMutation] = useMutation(PRODUCT_DELETE);

  const { data, refetch, loading } = useQuery(GET_PRODUCT, {
    variables: {
      shopId,
    },
  });

  const handleAlertDispatch = (input: any) => dispatch(openAlert(input));

  const handleEntryUpdate = (input: string) => {
    setOpen(false);
    refetch();
    if (input === "productCreate") {
      handleAlertDispatch({
        severity: "success",
        message: "PRODUCT_CREATED",
      });
    } else {
      handleAlertDispatch({
        severity: "success",
        message: "PRODUCT_UPDATE",
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
        if (data?.productDelete) {
          setSelected([]);
          refetch();
          handleAlertDispatch({
            severity: "success",
            message: "PRODUCT_DELETED",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setUpdateData({});
      }, 1000);
    }
  }, [open]);

  return (
    <>
      <Table
        hed={"Product"}
        disableSelectAllCheckBox
        showCredActions
        shouldSingleSelect
        handleAddActionClick={() => setOpen(true)}
        handleEditActionClick={handleEditClick}
        handleDeleteActionClick={handleDeleteClick}
        {...transformTableProduct(data?.getProducts || [])}
        selected={selected}
        setSelected={setSelected}
        loading={loading}
        name={"product"}
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
          {updateData?.id ? "Update Product" : "Create Product"}
        </Typography>
        <ProductForm
          onSuccess={(data: string) => handleEntryUpdate(data)}
          btnText={updateData?.id ? "update" : "Create"}
          shopId={shopId}
          updateData={updateData}
        />
      </Modal>
    </>
  );
}

export default ProductTable;
