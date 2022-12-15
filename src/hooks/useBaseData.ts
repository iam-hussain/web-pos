import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { deleteCookie, getCookie } from "cookies-next";
import { HEADER_TOKEN_KEY } from "@helper/constants";
import {} from "@redux/state/authSlice";
import { useDispatch } from "react-redux";
import { setStoreData, clearStoreData } from "@redux/state/storeSlice";
import authenticateQuery from "src/graphql/query/authenticateQuery";
import useToken from "./useToken";
import { setEmployeeData } from "@redux/state/employeeSlice";

export default function useBaseData() {
  const dispatch = useDispatch();
  const { token } = useToken();

  const { loading, data, error, refetch } = useQuery(authenticateQuery, {
    context: {
      headers: {
        [HEADER_TOKEN_KEY]: token || undefined,
      },
    },
    skip: !token,
  });
  const [base, setAuthenticate] = useState({});

  useEffect(() => {
    console.log("I am token ", { token });
    if (token) {
      refetch();
    }
  }, [refetch, token]);

  useEffect(() => {
    console.log({ data });
    if (data?.authenticate) {
      setAuthenticate(data?.authenticate);
    }
  }, [data]);

  useEffect(() => {
    const { hasShop, shop, hasEmployee, employee }: any = base;
    if (hasShop) {
      dispatch(setStoreData(shop));
    }
    if (hasEmployee) {
      dispatch(setEmployeeData(employee));
    }
  }, [base, dispatch]);

  useEffect(() => {
    if (error) {
      deleteCookie(HEADER_TOKEN_KEY);
      dispatch(clearStoreData());
    }
  }, [dispatch, error]);

  return {
    base,
    loading,
    refetch,
    error,
  };
}
