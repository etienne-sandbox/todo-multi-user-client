import { useMeLists } from "hooks/useMeLists";
import { Fragment, FunctionComponent } from "react";
import { css } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { Button } from "components/Button";
import { ListLinkItem } from "components/ListLinkItem";

export const Home: FunctionComponent = () => {
  const { data } = useMeLists();

  return (
    <AuthenticatedLayout
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
          <h3>Your lists</h3>
          <div className={css({ height: "$10" })} />
          {data && (
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                maxWidth: "300px",
                width: "100%",
              })}
            >
              {data.map((item, i) => (
                <Fragment key={item.id}>
                  {i > 0 && <div className={css({ height: "$02" })} />}
                  <ListLinkItem id={item.id} name={item.name} />
                </Fragment>
              ))}
            </div>
          )}
          <div className={css({ height: "$10" })} />
          <Button to="/create" text="Create List" />
        </div>
      }
    />
  );
};
