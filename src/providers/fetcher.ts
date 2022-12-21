import { DocumentNode, QueryOptions, MutationOptions } from "@apollo/client";
import { initializeApollo } from "@graphql/client";
import { getCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { HEADER_TOKEN_KEY } from "./constants";

export const queryData = async (
  QUERY: DocumentNode,
  variables: any = {},
  ctx: OptionsType | undefined = undefined
) => {
  let token;
  const request: QueryOptions = {
    query: QUERY,
    variables,
  };
  if (ctx) {
    token = getCookie(HEADER_TOKEN_KEY, ctx);
  } else {
    token = getCookie(HEADER_TOKEN_KEY);
  }
  if (token) {
    request.context = {
      headers: {
        [HEADER_TOKEN_KEY]: token,
      },
    };
  }
  const apolloClient = initializeApollo();
  const fetchData = await apolloClient.query(request);
  return { ...fetchData, token };
};

export const mutationData = async (
  MUTATION: DocumentNode,
  variables: any = {},
  ctx: OptionsType
) => {
  let token;
  const request: MutationOptions = {
    mutation: MUTATION,
    variables,
  };
  if (ctx) {
    token = getCookie(HEADER_TOKEN_KEY, ctx);
  } else {
    token = getCookie(HEADER_TOKEN_KEY);
  }
  if (token) {
    request.context = {
      headers: {
        [HEADER_TOKEN_KEY]: token,
      },
    };
  }
  const apolloClient = initializeApollo();
  const fetchData = await apolloClient.mutate(request);
  return { ...fetchData, token };
};
