import React, { useEffect } from "react";
import { Router as RouterOriginal, useLocation } from "react-router-dom";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

export function AppRouter({ children }) {
  return (
    <RouterOriginal history={history}>
      <ScrollToTop />
      {children}
    </RouterOriginal>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}
