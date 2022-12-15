import Loader from "@components/molecules/loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function withAuthorization(
  Component: JSX.Element | any,
  pageFor: "no_auth" | "user" | "pos" | "pos_emp" | "any"
) {
  function Wrapper(props: any) {
    const { authenticated, authenticate, authLoading } = props;
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const { hasUser, hasShop, isPOS } = authenticate || {};

      if (pageFor === "no_auth" && authenticated) {
        router.push("/");
      } else if (!authenticated || !authenticate) {
        router.push("/");
      } else if (pageFor === "user" && !hasUser) {
        router.push("/");
      } else if (pageFor === "pos" && (!isPOS || !hasShop)) {
        router.push("/");
      } else if (pageFor === "pos_emp" && (!isPOS || !hasUser || !hasShop)) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [authenticated, authenticate, router]);

    return (
      <>{loading || authLoading ? <Loader /> : <Component {...props} />}</>
    );
  }

  return Wrapper;
}

export default withAuthorization;
