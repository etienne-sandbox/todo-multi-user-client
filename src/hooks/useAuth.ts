import { AuthFetcher, createAuthFetcher, getMe, User } from "logic/api";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useLocalStorage } from "./useLocalStorage";

const TOKEN_STORAGE_KEY = `TODO_MULTI_USER_CLIENT_TOKEN_V1`;

export type AuthResult = {
  loading: boolean;
  user: User | null;
  setToken: (token: string) => void;
  logout: () => void;
  authFetcher: AuthFetcher | null;
};

export function useAuth(): AuthResult {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);

  const logout = useCallback(() => setToken(null), [setToken]);

  const authFetcher = useMemo(() => (token ? createAuthFetcher(token) : null), [
    token,
  ]);

  const getMeResolved = useCallback(
    () => (authFetcher ? getMe(authFetcher) : null),
    [authFetcher]
  );

  const me = useQuery(["me", token], getMeResolved, {
    onError: () => {
      setToken(null);
    },
    retry: false,
  });

  return {
    loading: me.isLoading,
    user: me.data ?? null,
    setToken,
    authFetcher,
    logout,
  };
}
