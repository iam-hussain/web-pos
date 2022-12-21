import React, { useEffect } from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { PRODUCT_CREATE, PRODUCT_UPDATE } from "@graphql/mutation";
import { Input, Selector } from "@components/atoms/input";
import { productValidation } from "@helpers/validationSchema";
import { Category } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import _ from "lodash";
import { RootState } from "@store";
import { useSelector } from "react-redux";

function ProductForm(props: any) {
  const { onSuccess, btnText, shopId, updateData } = props;
  const { id } = updateData;
  const { selectCategories } = useSelector(
    (state: RootState) => state.category
  );
  const [createMutation] = useMutation(PRODUCT_CREATE);
  const [updateMutate] = useMutation(PRODUCT_UPDATE);
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    onSubmit: handleOnSubmit,
    ...productValidation,
  });

  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setSubmitting,
    values,
    errors,
    touched,
    resetForm,
    setValues,
  } = formik;

  useEffect(() => {
    if (updateData && Object.keys(updateData).length) {
      setValues(updateData);
    }
  }, [setValues, updateData]);

  const inputProps = {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  };

  const setLoader = (input: boolean) => {
    setSubmitting(input);
    setLoading(input);
  };

  async function handleOnSubmit(values: any) {
    setLoading(true);
    try {
      const mutation = id ? updateMutate : createMutation;
      const query = id ? "productUpdate" : "productCreate";

      const result = await mutation({
        variables: {
          ...values,
          shopId,
          id,
        },
      });

      const mutated = _.get(result, `data.${query}.id`);
      if (mutated) {
        onSuccess(query);
        resetForm();
      }
      setLoader(false);
    } catch (error: any) {
      console.error(error);
      setLoader(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Input name="title" label="Title" {...inputProps} />
        <Input
          name="price"
          label="Price"
          type="number"
          inputProps={{
            maxLength: 13,
            step: "1",
          }}
          {...inputProps}
        />
        <Selector
          label="Category"
          title={"Category"}
          options={selectCategories}
          name="categoryId"
          {...inputProps}
        />

        <LoadingButton
          sx={{
            padding: 1,
            paddingInline: 4,
            marginInline: 2,
          }}
          variant="contained"
          loading={isSubmitting || loading}
          loadingPosition="end"
          endIcon={<Category />}
          color={"secondary"}
          type="submit"
        >
          {btnText}
        </LoadingButton>
      </Box>
    </form>
  );
}

export default ProductForm;
