import React from "react";
import { AUTHENTICATE } from "@graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { authUpdate } from "@reducers/authSlice";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import useToken from "@hooks/useToken";

function TokenProvider({ children }: any) {
  const token = useToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const hasToken = token.hasToken();
  const { loading, data, error, refetch } = useQuery(AUTHENTICATE, {
    context: {
      headers: {
        [HEADER_TOKEN_KEY]: token.getToken() || undefined,
      },
    },
    skip: !hasToken,
  });
  try {
    if (!hasToken) {
      return React.cloneElement(children, {
        authenticated: false,
        reAuth: refetch,
      });
    }

    if (error) {
      console.error(error);
      token.deleteToken();

      if (router.pathname !== "/") {
        router.push("/");
      }
    }

    if (data?.authenticate) dispatch(authUpdate(data.authenticate));
    return React.cloneElement(children, {
      authenticated: Boolean(!data?.authenticate),
      authenticate: { ...(data?.authenticate || {}) },
      reAuth: refetch,
      authLoading: loading,
      hasToken,
    });
  } catch (error) {
    console.log(error);
    return React.cloneElement(children, {
      authenticated: false,
      reAuth: refetch,
    });
  }
}

export default TokenProvider;
