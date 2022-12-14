import React from "react";
import { AUTHENTICATE } from "@graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

function TokenProvider({ children }: any) {
  const router = useRouter();
  const { loading, data, error, refetch } = useQuery(AUTHENTICATE);

  if (error) {
    deleteCookie("token");
    router.push("/");
  }

  return React.cloneElement(children, {
    ...(data.authenticate || {}),
    reAuth: refetch,
  });
}

export default TokenProvider;
