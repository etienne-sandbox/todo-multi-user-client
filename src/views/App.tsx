import { useAuth } from "hooks/useAuth";
import { FunctionComponent } from "react";
import { AnonymousApp } from "./AnonymousApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { LoadingView } from "./LoadingView";

export const App: FunctionComponent = () => {
  const { loading, user, setToken, logout, authFetcher } = useAuth();

  if (loading) {
    return <LoadingView />;
  }

  if (user === null || authFetcher === null) {
    return <AnonymousApp setToken={setToken} />;
  }
  return (
    <AuthenticatedApp me={user} logout={logout} authFetcher={authFetcher} />
  );
};
