import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { css } from "stitches.config";
import { Layout } from "./Layout";

export const NotFound: FunctionComponent = () => {
  return (
    <Layout
      content={
        <div
          className={css({
            textAlign: "center",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <h3>Page not found</h3>
          <p>
            <Link to="/">Go back home</Link>
          </p>
        </div>
      }
    />
  );
};
