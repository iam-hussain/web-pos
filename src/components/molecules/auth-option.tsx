import PropTypes from "prop-types";
import React from "react";
import NextLink from "next/link";
import { Box, Divider, Link, Typography } from "@mui/material";

function AuthOption({ dek, link, btnText }: any) {
  return (
    <>
      <Divider
        variant="middle"
        sx={{
          paddingTop: 4,
        }}
      />
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{
          paddingTop: 4,
        }}
      >
        <Typography
          variant="body1"
          align="center"
          dangerouslySetInnerHTML={{ __html: dek }}
        />
        <NextLink href={link}>
          <Link variant="body1" component="button" color={"primary.main"}>
            {btnText}
          </Link>
        </NextLink>
      </Box>
    </>
  );
}

AuthOption.propTypes = {
  btnText: PropTypes.string.isRequired,
  dek: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AuthOption;
