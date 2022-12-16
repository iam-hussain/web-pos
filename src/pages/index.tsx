import * as React from "react";
import withAuthorization from "@providers/withAuthorization";
import GenericLayout from "@components/templates/generic-layout";

function Home() {
  return <GenericLayout></GenericLayout>;
}

export default withAuthorization(Home, "shouldNotBeAnyOne");
