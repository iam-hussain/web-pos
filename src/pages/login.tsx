import React from "react";
import NextLink from "next/link";
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

function LogIn() {
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              autoComplete="email"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              autoComplete="new-password"
            />
            <Button
              sx={{
                padding: 1,
                paddingInline: 4,
                marginInline: 2,
              }}
              variant="contained"
              endIcon={<Login />}
            >
              Log In
            </Button>
          </Box>
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

export default LogIn;
