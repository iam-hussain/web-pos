import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { CATEGORY_CREATE, CATEGORY_UPDATE } from "@graphql/mutation";
import Input from "@components/atoms/input";
import { categoryValidation } from "@helpers/validationSchema";
import { Category } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";

function CategoryForm({ onSuccess, btnText, shopId, id, title }: any) {
  const [mutateFunction] = useMutation(CATEGORY_CREATE);
  const [updateMutateFunction] = useMutation(CATEGORY_UPDATE);
  const [loading, setLoading] = React.useState(false);
  async function handleOnSubmit(values: any, { setSubmitting }: any) {
    setLoading(true);
    try {
      let catId;

      if (id) {
        const result = await updateMutateFunction({
          variables: {
            ...values,
            shopId,
            id,
          },
        });
        catId = _.get(result, "data.categoryUpdate.id");
      } else {
        const result = await mutateFunction({
          variables: {
            ...values,
            shopId,
          },
        });
        catId = _.get(result, "data.categoryCreate.id");
      }
      if (catId) {
        onSuccess();
        setSubmitting(false);
        setLoading(false);
      } else {
        setSubmitting(false);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      setSubmitting(false);
      setLoading(false);
    }
  }

  return (
    <Formik
      onSubmit={handleOnSubmit}
      {...categoryValidation}
      initialValues={title ? { title } : categoryValidation.initialValues}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Input
              name="title"
              label="Title"
              {...(title ? { setValues: title } : {})}
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
      )}
    </Formik>
  );
}

export default CategoryForm;
