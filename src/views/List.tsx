import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

export const List: FunctionComponent = () => {
  let { listId } = useParams<{ listId: string }>();

  return <AuthenticatedLayout back={true} content={<p>List {listId}</p>} />;
};
