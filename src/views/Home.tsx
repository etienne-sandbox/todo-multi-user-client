import { useMeLists } from "hooks/useMeLists";
import { Fragment, FunctionComponent } from "react";
import { css } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { ListLinkItem } from "components/ListLinkItem";
import { ResourceHandler } from "components/ResourceHandler";
import { CloudArrowDown, CloudCheck, Plus } from "phosphor-react";
import { Spacer } from "components/Spacer";
import { ScrollFlex } from "components/ScrollFlex";
import { IconButton } from "components/IconButton";

export const Home: FunctionComponent = () => {
  const listsRes = useMeLists();

  return (
    <AuthenticatedLayout
      rightAction={
        <div
          className={css({
            padding: "$02",
            display: "flex",
            flexDirection: "row",
          })}
        >
          <IconButton to="/create" icon={<Plus size={30} />} />
        </div>
      }
      content={
        <div
          className={css({
            textAlign: "center",
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "$10",
            paddingBottom: "$10",
          })}
        >
          <h3
            className={css({
              display: "flex",
              alignItems: "center",
            })}
          >
            {listsRes.isFetching ? (
              <CloudArrowDown size={20} />
            ) : (
              <CloudCheck size={20} />
            )}
            <Spacer css={{ width: "$02" }} />
            <span>Your lists</span>
          </h3>
          <Spacer css={{ height: "$10" }} />
          <ScrollFlex>
            <ResourceHandler
              resource={listsRes}
              renderResolved={(data) => (
                <div
                  className={css({
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    maxWidth: "300px",
                    width: "100%",
                    padding: "$10",
                    paddingTop: 0,
                  })}
                >
                  {data.map((item, i) => (
                    <Fragment key={item.id}>
                      {i > 0 && <Spacer css={{ height: "$02" }} />}
                      <ListLinkItem id={item.id} name={item.name} />
                    </Fragment>
                  ))}
                </div>
              )}
            />
          </ScrollFlex>
        </div>
      }
    />
  );
};
