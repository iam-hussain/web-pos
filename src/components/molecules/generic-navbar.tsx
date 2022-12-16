import * as React from "react";
import TopBar from "@components/atoms/top-bar";
import UserAction from "@components/molecules/user-action";
import NonUserAction from "@components/molecules/non-user-action";

function GenericNavBar() {
  return (
    <TopBar>
      <UserAction />
      <NonUserAction />
    </TopBar>
  );
}

export default GenericNavBar;
