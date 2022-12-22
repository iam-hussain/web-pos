import { initializeApollo } from "@graphql/client";
import { AUTHENTICATE } from "@graphql/query";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { authUpdate } from "@reducers/authenticateSlice";
import { getCookie } from "cookies-next";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushRouter } from "@helpers/serverSide";

export default function withAuthorization(
  Component: JSX.Element | any,
  authorizedFor:
    | "shouldNotBeNoOne"
    | "shouldBeUser"
    | "shouldBePOS"
    | "shouldBePOSEmployee"
    | "shouldNotBeAnyOne"
) {
  const AuthWrapper = (props: any) => {
    const dispatch = useDispatch();
    const { authenticate } = props;
    const handleStorageEvent = (event: any) => {
      if (
        ["shouldBeUser", "shouldBePOS", "shouldBePOSEmployee"].includes(
          authorizedFor
        ) &&
        event.key === "logout"
      ) {
        Router.push("/login");
      }
      if (authorizedFor === "shouldNotBeNoOne" && event.key === "login") {
        Router.push("/");
      }
      if (
        ["shouldBePOS", "shouldBePOSEmployee"].includes(authorizedFor) &&
        event.key === "pos_logout"
      ) {
        Router.push("/");
      }

      if (
        "shouldBePOSEmployee" === authorizedFor &&
        event.key === "pos_emp_logout"
      ) {
        Router.push("/pos");
      }

      if (
        ["shouldBeUser", "shouldNotBeAnyOne"].includes(authorizedFor) &&
        event.key === "pos_emp_login"
      ) {
        Router.push("/pos");
      }

      if (
        ["shouldBeUser", "shouldNotBeAnyOne", "shouldBePOSEmployee"].includes(
          authorizedFor
        ) &&
        event.key === "pos_login"
      ) {
        Router.push("/pos");
      }
    };
    useEffect(() => {
      window.addEventListener("storage", handleStorageEvent);
      return () => {
        window.removeEventListener("storage", handleStorageEvent);
      };
    }, []);

    useEffect(() => {
      if (authenticate) {
        dispatch(authUpdate(authenticate));
      }
    }, [dispatch, authenticate]);

    return <Component {...props} />;
  };

  AuthWrapper.getInitialProps = async (ctx: any) => {
    const token = getCookie(HEADER_TOKEN_KEY, ctx);

    if (authorizedFor === "shouldNotBeNoOne" && token) {
      return pushRouter(ctx, "/");
    }

    const apolloClient = initializeApollo();

    let fetchData = undefined;
    if (token) {
      fetchData = await apolloClient.query({
        query: AUTHENTICATE,
        context: {
          headers: {
            [HEADER_TOKEN_KEY]: token,
          },
        },
      });
    }

    const authData = fetchData?.data?.authenticate || undefined;
    const isAuthenticated = !!authData;
    const { hasUser, hasShop, isPOS, user, shop } = authData || {};
    const authenticate = {
      token,
      isAuthenticated,
      ...authData,
      hasUser: (isAuthenticated && hasUser && user) || false,
      hasShop: (isAuthenticated && hasShop && shop) || false,
      isPOS: (isAuthenticated && isPOS && shop) || false,
      isPOSEmp: (isAuthenticated && user && isPOS && shop) || false,
      isUser: (isAuthenticated && user && !isPOS) || false,
    };

    if (authorizedFor === "shouldBeUser" && !authenticate.hasUser) {
      return pushRouter(ctx, "/");
    }

    if (authorizedFor === "shouldBePOS" && !authenticate.hasShop) {
      return pushRouter(ctx, "/");
    }

    if (authorizedFor === "shouldBePOSEmployee" && !authenticate.hasUser) {
      if (authenticate.isPOS) {
        return pushRouter(ctx, "/pos");
      } else {
        return pushRouter(ctx, "/pos");
      }
    }

    const componentProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));

    return {
      ...componentProps,
      initialApolloState: apolloClient.cache.extract(),
      authenticate,
      initializeApollo,
    };
  };
  return AuthWrapper;
}
