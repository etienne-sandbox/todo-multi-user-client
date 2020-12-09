import { QueryResult, QueryStatus } from "react-query";
import { ErrorBox } from "./ErrorBox";

type Props<TResult, TError> = {
  resource: QueryResult<TResult, TError>;
  renderResolved?: (data: TResult, updating: boolean) => JSX.Element | null;
  renderPending?: () => JSX.Element | null;
  renderRejected?: (error: TError, updating: boolean) => JSX.Element | null;
};

export function ResourceHandler<TResult, TError>({
  resource,
  renderResolved,
  renderPending,
  renderRejected,
}: Props<TResult, TError>): JSX.Element | null {
  const { status, isFetching, data, error } = resource;

  console.log(status);

  if (status === QueryStatus.Error) {
    if (renderRejected) {
      return renderRejected(error as any, isFetching);
    }
    return <ErrorBox error={error} />;
  }

  if (status === QueryStatus.Success) {
    if (renderResolved) {
      return renderResolved(data as any, isFetching);
    }
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  if (status === QueryStatus.Loading) {
    if (renderPending) {
      return renderPending();
    }
    return null;
  }

  return null;
}
