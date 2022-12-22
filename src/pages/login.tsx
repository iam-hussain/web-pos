import React from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { Box, Paper, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Login from "@mui/icons-material/Login";
import IslandLayout from "@components/templates/island-layout";
import { USER_LOGIN } from "@graphql/mutation";
import _ from "lodash";
import InputFormik from "@components/atoms/input";
import useToken from "@hooks/useToken";
import withAuthorization from "@providers/withAuthorization";
import { getMessage } from "@helpers/message";
import { loginValidation } from "@helpers/validationSchema";
import AuthOption from "@components/molecules/auth-option";

function LogIn() {
  const { setToken } = useToken();
  const [loading, setLoading] = React.useState(false);
  const [mutateFunction] = useMutation(USER_LOGIN);

  async function handleOnSubmit(
    values: any,
    { setSubmitting, setErrors }: any
  ) {
    setLoading(true);
    try {
      const result = await mutateFunction({ variables: values });
      const jwt = _.get(result, "data.userLogin");
      if (jwt) {
        setToken(jwt);
      } else {
        setSubmitting(false);
        setLoading(false);
      }
    } catch (error: any) {
      if (error.message === "EMAIL_UNREGISTER") {
        setErrors({ email: getMessage(error.message) });
      }
      if (error.message === "INVALID_PASSWORD") {
        setErrors({ password: getMessage(error.message) });
      }
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
          variant="outlined"
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
              Login to your user account to overview and control the POS in the
              admin panel
            </Typography>
          </Box>

          <Formik onSubmit={handleOnSubmit} {...loginValidation}>
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
                    name="email"
                    label="Email"
                    autoComplete="email"
                  />
                  <InputFormik
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
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
                    endIcon={<Login />}
                    color={"secondary"}
                    type="submit"
                  >
                    Log In
                  </LoadingButton>
                </Box>
              </form>
            )}
          </Formik>
          <AuthOption
            link={"/register"}
            btnText={"Register"}
            dek={"Don&rsquo;t have an account?"}
          />
        </Paper>
      </Box>
    </IslandLayout>
  );
}

export default withAuthorization(LogIn, "shouldNotBeNoOne");
