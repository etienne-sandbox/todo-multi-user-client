import { ResourceHandler } from "components/ResourceHandler";
import { useList } from "hooks/useList";
import { FunctionComponent } from "react";
import { css } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { AddTodo } from "./AddTodo";

type Props = {
  listId: string;
};

export const List: FunctionComponent<Props> = ({ listId }) => {
  const listRes = useList(listId);

  return (
    <ResourceHandler
      resource={listRes}
      renderResolved={(list) => (
        <AuthenticatedLayout
          title={list.name}
          back={true}
          content={<pre>{JSON.stringify(list, null, 2)}</pre>}
          rightAction={
            <div
              className={css({
                padding: "$02",
                display: "flex",
                flexDirection: "row",
              })}
            >
              <AddTodo listId={list.id} />
            </div>
          }
        />
      )}
      renderPending={() => (
        <AuthenticatedLayout back={true} content={<div>Loading...</div>} />
      )}
    />
  );
};
