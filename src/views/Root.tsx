import { FunctionComponent } from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { queryCache } from "logic/queryCache";
import { ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { OverlayProvider } from "react-oot";

export const Root: FunctionComponent = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Router>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
};
