import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORY, GET_PRODUCT, GET_SHOP_CONNECTS } from "@graphql/query";
import {
  setCategories,
  catchCategories,
  setCategoryLoading,
} from "@reducers/categorySlice";
import {
  setProducts,
  catchProducts,
  setProductLoading,
} from "@reducers/productSlice";
import { setConnects } from "@reducers/shopSlice";

function useFetchPOS() {
  const dispatch = useDispatch();

  const [getCategories, useCategory] = useLazyQuery(GET_CATEGORY);
  const [getProducts, useProduct] = useLazyQuery(GET_PRODUCT);
  const [getShopConnects, useShopConnect] = useLazyQuery(GET_SHOP_CONNECTS);

  function fetchCategories(shopId: number) {
    dispatch(setCategoryLoading());
    getCategories({ variables: { shopId } })
      .then(({ data }) => dispatch(setCategories(data?.getCategories || [])))
      .catch((error) => {
        console.error(error);
        dispatch(catchCategories());
      });
  }

  function fetchProducts(shopId: number) {
    dispatch(setProductLoading());
    getProducts({ variables: { shopId } })
      .then(({ data }) => dispatch(setProducts(data?.getProducts || [])))
      .catch((error) => {
        console.error(error);
        dispatch(catchProducts());
      });
  }

  function fetchShopConnects(shopId: number) {
    dispatch(setProductLoading());
    getShopConnects({ variables: { shopId } })
      .then((load) => {
        console.log({ load });
        dispatch(setConnects(load.data?.getShopConnects || []));
      })
      .catch(console.error);
  }

  const fetchAll = (shopId: number) => {
    fetchCategories(shopId);
    fetchProducts(shopId);
    fetchShopConnects(shopId);
  };

  const refetchAll = () => {
    useCategory.refetch();
    useProduct.refetch();
    useShopConnect.refetch();
  };

  return {
    useCategory,
    useProduct,
    useShopConnect,
    fetchAll,
    refetchAll,
    fetchCategories,
    fetchProducts,
    fetchShopConnects,
  };
}

export default useFetchPOS;
