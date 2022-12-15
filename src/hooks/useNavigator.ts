import { useState, useEffect } from "react";
import Bowser from "bowser";

export default function useNavigator() {
  const [navigator, setNavigator] = useState({});

  useEffect(() => {
    if (window) {
      setNavigator({
        platform: window.navigator?.platform,
        language: window.navigator?.language,
        vendor: window.navigator?.vendor,
        userAgent: window.navigator?.userAgent,
        parsed: Bowser.parse(window.navigator.userAgent),
      });
    }
  }, []);

  return navigator;
}
