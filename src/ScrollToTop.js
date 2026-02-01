import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll en haut (0, 0) à chaque changement de route
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}