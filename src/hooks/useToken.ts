import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { HEADER_TOKEN_KEY } from "@providers/constants";

export default function useToken() {
  const getToken = () => getCookie(HEADER_TOKEN_KEY);
  const setToken = (token: string) => setCookie(HEADER_TOKEN_KEY, token);
  const deleteToken = () => deleteCookie(HEADER_TOKEN_KEY);
  const hasToken = () => {
    const jwt = getToken();
    if (jwt && typeof jwt === "string") {
      return true;
    }
    return false;
  };

  return { getToken, setToken, deleteToken, hasToken };
}
