import React from "react";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Paper, Typography } from "@mui/material";
import AppRegistration from "@mui/icons-material/AppRegistration";
import { useRouter } from "next/router";
import { USER_REGISTER } from "@graphql/mutation";
import { USER_DUPLICATE_CHECK } from "@graphql/query";
import IslandLayout from "@components/templates/island-layout";
import InputFormik from "@components/atoms/input";
import _ from "lodash";
import { registerValidation } from "@helpers/validationSchema";
import { getMessage } from "@helpers/message";
import useToken from "@hooks/useToken";
import withAuthorization from "@providers/withAuthorization";
import AuthOption from "@components/molecules/auth-option";
import LoadingButton from "@mui/lab/LoadingButton";

function Register() {
  const router = useRouter();
  const { setToken } = useToken();
  const [loading, setLoading] = React.useState(false);
  const [mutateFunction] = useMutation(USER_REGISTER);
  const { refetch } = useQuery(USER_DUPLICATE_CHECK, {
    skip: true,
  });

  async function handleOnSubmit(
    values: any,
    { setErrors, setSubmitting, resetForm }: any
  ) {
    try {
      const emailDub = await refetch({ key: "email", value: values.email });
      const mobDub = await refetch({
        key: "mobileNumber",
        value: values.mobileNumber,
      });

      const emailDubRes = _.get(emailDub, "data.userDuplicateCheck");
      const mobDubRes = _.get(mobDub, "data.userDuplicateCheck");
      const error: any = {};
      if (emailDubRes) {
        error.email = getMessage("EMAIL_DUPLICATE");
      }
      if (mobDubRes) {
        error.mobileNumber = getMessage("MOBILE_DUPLICATE");
      }

      if (!emailDubRes && !mobDubRes) {
        const result = await mutateFunction({ variables: values });
        const jwt = _.get(result, "data.userRegister");
        if (jwt) {
          setToken(jwt);
          router.push("/");
        } else {
          setSubmitting(false);
          setLoading(false);
        }
      } else {
        setErrors(error);
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
    <IslandLayout>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingBottom={2}
      >
        <Paper
          elevation={24}
          sx={{
            padding: 5,
            maxWidth: 500,
            "@media (max-width: 780px)": {
              padding: 2,
              paddingY: 4,
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={0}
            paddingBottom={4}
            color="primary"
          >
            <Typography variant="h5" paddingBottom={1} color="neutral">
              Create Account
            </Typography>
            <Typography
              variant="body2"
              component="span"
              color={"GrayText"}
              align="center"
            >
              Create a free account and start using POS application with full
              admin control
            </Typography>
          </Box>
          <Formik onSubmit={handleOnSubmit} {...registerValidation}>
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <InputFormik
                    name="firstName"
                    label="First Name"
                    autoComplete="given-name"
                  />
                  <InputFormik
                    name="lastName"
                    label="Last Name"
                    autoComplete="given-name"
                  />
                  <InputFormik
                    name="email"
                    label="Email"
                    autoComplete="email"
                  />
                  <InputFormik
                    name="mobileNumber"
                    label="Phone"
                    autoComplete="tel"
                  />
                  <InputFormik
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />

                  <InputFormik
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
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
                    endIcon={<AppRegistration />}
                    color={"secondary"}
                    type="submit"
                  >
                    Create Account
                  </LoadingButton>
                </Box>
              </form>
            )}
          </Formik>
          <AuthOption
            dek={"Already have an account?"}
            link={"/login"}
            btnText={"Log In"}
          />
        </Paper>
      </Box>
    </IslandLayout>
  );
}

export default withAuthorization(Register, "shouldNotBeNoOne");
