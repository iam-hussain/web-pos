import withAuthorization from "@providers/withAuthorization";
import { RootState } from "@store";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

export const POSHome = () => {
  return <div>POSHome</div>;
};

export default withAuthorization(POSHome, "shouldBePOS");
