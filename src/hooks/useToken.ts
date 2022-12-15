import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { HEADER_TOKEN_KEY } from "@providers/constants";

export default function useToken() {
  const getToken = () => getCookie(HEADER_TOKEN_KEY);
  const setToken = (token: string) => {
    setCookie(HEADER_TOKEN_KEY, token);
    window.localStorage.setItem("login", Date.now().toString());
  };
  const deleteToken = () => {
    deleteCookie(HEADER_TOKEN_KEY);
    window.localStorage.setItem("logout", Date.now().toString());
  };

  return { getToken, setToken, deleteToken };
}
