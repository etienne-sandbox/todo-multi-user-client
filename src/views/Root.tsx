import { FunctionComponent, StrictMode, Suspense } from "react";
import { queryCache } from "logic/queryCache";
import { ReactQueryCacheProvider } from "react-query";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { OverlayProvider } from "react-oot";
import { LoadingView } from "./LoadingView";
// import { ReactQueryDevtools } from "react-query-devtools";

export const Root: FunctionComponent = () => {
  return (
    <StrictMode>
      <Suspense fallback={<LoadingView />}>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <Router>
            <OverlayProvider>
              <App />
              {/* <ReactQueryDevtools /> */}
            </OverlayProvider>
          </Router>
        </ReactQueryCacheProvider>
      </Suspense>
    </StrictMode>
  );
};
