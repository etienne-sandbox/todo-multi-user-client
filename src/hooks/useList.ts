import { useAuthFetcherOrThrow } from "./useAuthFetcher";
import { getList } from "logic/api";
import { useQuery } from "react-query";
import { useMeOrThrow } from "./useMe";

export function useList(listId: string) {
  const authFetcher = useAuthFetcherOrThrow();
  const me = useMeOrThrow();

  return useQuery(["list", listId, me.token], () =>
    getList(authFetcher, listId)
  );
}
