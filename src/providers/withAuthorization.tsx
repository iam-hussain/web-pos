import { initializeApollo } from "@graphql/client";
import { AUTHENTICATE } from "@graphql/query";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { getCookie } from "cookies-next";
import Router from "next/router";
import { useEffect } from "react";

export default function withAuthorization(
  Component: JSX.Element | any,
  authorizedFor:
    | "shouldNotBeNoOne"
    | "shouldBeUser"
    | "shouldBePOS"
    | "shouldBePOSEmployee"
    | "shouldNotBeAnyOne"
) {
  const AuthWrapper = ({ ...props }) => {
    const handleStorageEvent = (event: any) => {
      console.log({ event });
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
    };
    useEffect(() => {
      window.addEventListener("storage", handleStorageEvent);
      return () => {
        window.removeEventListener("storage", handleStorageEvent);
      };
    }, []);

    return <Component {...props} />;
  };

  AuthWrapper.getInitialProps = async (ctx: any) => {
    const pushRouter = (ctx: any, path: string) => {
      if (ctx.req) {
        ctx.res.writeHead(302, { Location: path });
        ctx.res.end();
        return null;
      } else {
        Router.push(path);
        return null;
      }
    };

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
    const authenticated = !!authData;
    const { hasUser, hasShop, isPOS } = authData || {};
    const authenticate = {
      token,
      authenticated,
      ...authData,
      hasUser: hasUser || false,
      hasShop: hasShop || false,
      isPOS: isPOS || false,
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
      props: {
        ...(componentProps?.props || {}),
        initialApolloState: apolloClient.cache.extract(),
        authenticate,
      },
    };
  };
  return AuthWrapper;
}
