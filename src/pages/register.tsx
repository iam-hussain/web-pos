import React from "react";
import NextLink from "next/link";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Divider, Link, Paper, Typography, Button } from "@mui/material";
import AppRegistration from "@mui/icons-material/AppRegistration";
import { useRouter } from "next/router";

import { USER_REGISTER } from "@graphql/mutation";
import { USER_DUPLICATE_CHECK } from "@graphql/query";
import Island from "@components/templates/island";
import Input from "@components/atoms/input";
import _ from "lodash";
import { setCookie } from "cookies-next";
import { registerValidation } from "@helpers/validationSchema";
import { getMessage } from "@helpers/message";
import useToken from "@hooks/useToken";
import withAuthorization from "@helpers/withAuthorization";

function Register({ reAuth }: any) {
  const router = useRouter();
  const token = useToken();
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
        error.email = getMessage("email_duplicate");
      }
      if (mobDubRes) {
        error.mobileNumber = getMessage("mobile_duplicate");
      }

      if (!emailDubRes && !mobDubRes) {
        const result = await mutateFunction({ variables: values });
        const jwt = _.get(result, "data.userRegister");
        if (jwt) {
          token.setToken(jwt);
          reAuth();
          router.push("/dashboard");
          resetForm();
        }
      } else {
        setErrors(error);
      }
    } catch (error: any) {
      console.error(error);
    }
    setSubmitting(false);
  }

  return (
    <Island>
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
                  <Input
                    name="firstName"
                    label="First Name"
                    autoComplete="given-name"
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    autoComplete="given-name"
                  />
                  <Input name="email" label="Email" autoComplete="email" />
                  <Input name="mobileNumber" label="Phone" autoComplete="tel" />
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />

                  <Input
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                  <Button
                    sx={{
                      padding: 1,
                      paddingInline: 4,
                      marginInline: 2,
                    }}
                    variant="contained"
                    endIcon={<AppRegistration />}
                    color={"secondary"}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Create Account
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Divider
            variant="middle"
            sx={{
              paddingTop: 4,
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{
              paddingTop: 4,
            }}
          >
            <Typography variant="body1" align="center">
              Already have an account?{" "}
              <NextLink href={`/register`}>
                <Link variant="body1" component="button" color={"primary.main"}>
                  Log In
                </Link>
              </NextLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Island>
  );
}

export default withAuthorization(Register, "no_auth");
