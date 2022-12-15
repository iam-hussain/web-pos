import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Typography, Grid } from "@mui/material";
import Error from "@mui/icons-material/ErrorOutline";
import { BrandCleanSvg } from "@components/atoms/svg";

export default function ErrorPage() {
  const router = useRouter();
  const [count, setCount] = useState(15);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((data) => data - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (count <= 1) {
      router.push("/");
    }
  }, [count, router]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="start"
      style={{ minHeight: "100vh", paddingTop: 16, paddingBottom: 16 }}
    >
      <Grid
        item
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BrandCleanSvg className="svg-mid" />
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
        xs
      >
        <Error sx={{ fontSize: "10rem" }} color="error" />
        <div>
          <Typography variant="h4" paddingBottom={1} align="center">
            Unexpected error!
          </Typography>
          <Typography
            variant="body2"
            component="span"
            color={"GrayText"}
            align="center"
          >
            You will be automatically redirected in {count} seconds
          </Typography>
        </div>
        <Button
          sx={{
            padding: 1,
            paddingInline: 8,
            marginTop: 5,
          }}
          variant="contained"
          onClick={() => router.push("/")}
        >
          Goto Homepage
        </Button>
      </Grid>
    </Grid>
  );
}
