import { useAuthFetcherOrThrow } from "./useAuthFetcher";
import { getMeLists } from "logic/api";
import { useQuery } from "react-query";
import { useMeOrThrow } from "./useMe";

export function useMeLists() {
  const authFetcher = useAuthFetcherOrThrow();
  const me = useMeOrThrow();

  return useQuery(["lists", me.token], () => getMeLists(authFetcher));
}
