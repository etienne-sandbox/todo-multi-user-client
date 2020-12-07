import { AuthFetcher } from "logic/api";
import { createContext, useContext } from "react";

export const AuthFetcherContext = createContext<AuthFetcher | null>(null);

export function useAuthFetcher(): AuthFetcher | null {
  const authFetcher = useContext(AuthFetcherContext);
  return authFetcher;
}

export function useAuthFetcherOrThrow(): AuthFetcher {
  const authFetcher = useAuthFetcher();
  if (authFetcher === null) {
    throw new Error("Missing AuthFetcher context");
  }
  return authFetcher;
}
