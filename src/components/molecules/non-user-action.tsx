import * as React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { RootState } from "@store";

function NonUserAction() {
  const router = useRouter();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authenticate
  );

  return (
    <>
      {!isAuthenticated && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="text"
            color={"secondary"}
            type="submit"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            color={"secondary"}
            type="submit"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );
}

export default NonUserAction;
