import React from "react";
import NextLink from "next/link";
import * as yup from "yup";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Link,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Login from "@mui/icons-material/Login";

import Island from "@components/templates/island";
import { USER_LOGIN } from "@graphql/mutation";
import { setCookie } from "cookies-next";
import _ from "lodash";
import Input from "@components/atoms/input";
import useToken from "@hooks/useToken";
import withAuthorization from "@providers/withAuthorization";

function LogIn(props: any) {
  const router = useRouter();
  const token = useToken();
  const [mutateFunction] = useMutation(USER_LOGIN);

  type Values = {
    email: string;
    password: string;
  };

  const initialValues: Values = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Not a valid email")
      .required("Email is required"),
    password: yup.string().trim().required("Password is required"),
  });

  async function handleOnSubmit(
    values: Values,
    { setSubmitting, resetForm, setErrors }: any
  ) {
    try {
      const result = await mutateFunction({ variables: values });
      const jwt = _.get(result, "data.userLogin");

      if (jwt) {
        token.setToken(jwt);
        router.push("/dashboard");
        resetForm();
      }
      setSubmitting(false);
      resetForm();
    } catch (error: any) {
      console.log({ error });
      if (error.message === "EMAIL_UNREGISTERED") {
        setErrors({ email: "Email unregistered" });
      }
      if (error.message === "INVALID_PASSWORD") {
        setErrors({ password: "Incorrect password" });
      }
      console.error(error);
      setSubmitting(false);
    }
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
          variant="outlined"
          sx={{
            padding: 5,
            maxWidth: 500,
            "@media (max-width: 780px)": {
              padding: 2,
            },
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={0}
                  paddingBottom={4}
                >
                  <Typography variant="h5" paddingBottom={1}>
                    Log In
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    color={"GrayText"}
                    align="center"
                  >
                    Login to your user account to overview and control the POS
                    in the admin panel
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Input name="email" label="Email" autoComplete="email" />
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                  <Button
                    sx={{
                      padding: 1,
                      paddingInline: 4,
                      marginInline: 2,
                    }}
                    variant="contained"
                    endIcon={<Login />}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Log In
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
              Don&rsquo;t have an account?{" "}
              <NextLink href={`/register`}>
                <Link variant="body1" component="button" color={"primary.main"}>
                  Register
                </Link>
              </NextLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Island>
  );
}

export default withAuthorization(LogIn, "shouldNotBeNoOne");
