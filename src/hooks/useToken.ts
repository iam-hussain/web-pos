import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { HEADER_TOKEN_KEY } from "@providers/constants";
import { useDispatch } from "react-redux";
import { authReset } from "@reducers/authenticateSlice";
import { useRouter } from "next/router";

type OPTIONS = {
  isPOS?: boolean;
  isPOS_EMP?: boolean;
};

export default function useToken() {
  const router = useRouter();
  const dispatch = useDispatch();
  const getToken = () => getCookie(HEADER_TOKEN_KEY);
  const setToken = (token: string, options?: OPTIONS) => {
    setCookie(HEADER_TOKEN_KEY, token);
    if (options?.isPOS) {
      window.localStorage.setItem("pos_login", Date.now().toString());
      router.push("/pos");
    } else if (options?.isPOS_EMP) {
      window.localStorage.setItem("pos_emp_login", Date.now().toString());
      router.push("/pos");
    } else {
      window.localStorage.setItem("login", Date.now().toString());
      router.push("/outlet");
    }
  };
  const deleteToken = (options?: OPTIONS) => {
    dispatch(authReset());
    deleteCookie(HEADER_TOKEN_KEY);
    if (options?.isPOS) {
      window.localStorage.setItem("pos_logout", Date.now().toString());
      router.push("/login");
    } else if (options?.isPOS_EMP) {
      window.localStorage.setItem("pos_emp_logout", Date.now().toString());
      router.push("/login");
    } else {
      window.localStorage.setItem("logout", Date.now().toString());
      router.push("/login");
    }
  };

  return { getToken, setToken, deleteToken };
}
