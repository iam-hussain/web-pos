import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function withAuthorization(
  Component: JSX.Element | any,
  pageFor: "user" | "employee" | "store" | "user_store",

  mustLoggedIn: Boolean = true
) {
  function Wrapper({ payload, ...props }: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const { hasEmployee, hasShop, hasUser } = payload;

      if (pageFor === "store" && !mustLoggedIn && hasShop) {
        router.push("/store/login");
      } else if (pageFor === "store" && mustLoggedIn && !hasShop) {
        router.push("/store/activate");
      } else if (pageFor === "employee" && !mustLoggedIn && !hasShop) {
        router.push("/store/activate");
      } else if (
        pageFor === "employee" &&
        !mustLoggedIn &&
        hasShop &&
        hasEmployee
      ) {
        router.push("/store");
      } else if (
        pageFor === "employee" &&
        mustLoggedIn &&
        hasShop &&
        !hasEmployee
      ) {
        router.push("/store/login");
      } else if (
        pageFor === "employee" &&
        mustLoggedIn &&
        (!hasShop || !hasEmployee)
      ) {
        router.push("/store/activate");
      } else if (pageFor === "user" && !mustLoggedIn && hasUser) {
        router.push("/user");
      } else if (pageFor === "user" && mustLoggedIn && !hasUser) {
        router.push("/login");
      } else if (
        pageFor === "user_store" &&
        mustLoggedIn &&
        hasUser &&
        !hasShop
      ) {
        router.push("/user/store");
      } else if (pageFor === "user_store" && mustLoggedIn && !hasUser) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [payload, router]);

    return <>{!loading && <Component {...props} />}</>;
  }

  return Wrapper;
}

export default withAuthorization;
