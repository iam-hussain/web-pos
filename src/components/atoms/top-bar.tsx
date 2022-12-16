import PropTypes from "prop-types";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { BrandCleanSvg } from "@components/atoms/svg";

function TopBar({ children }: any) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        boxShadow: "none",
        borderBottom: 2,
        borderColor: "#e8e8e8",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BrandCleanSvg className="svg-small" color="primary" />
        {children}
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  children: PropTypes.any,
};

export default TopBar;
