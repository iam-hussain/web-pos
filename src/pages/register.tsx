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
import AppRegistration from "@mui/icons-material/AppRegistration";

import Island from "@components/templates/island";

function Register() {
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
              label="First Name"
              variant="outlined"
              autoComplete="given-name"
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              autoComplete="family-name"
            />
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
              label="Phone"
              variant="outlined"
              autoComplete="tel"
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
              endIcon={<AppRegistration />}
            >
              Create Account
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
              Already have an account?{" "}
              <NextLink href={`/login`}>
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

export default Register;
