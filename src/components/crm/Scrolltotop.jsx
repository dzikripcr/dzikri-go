import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.state]);

  return null;
}