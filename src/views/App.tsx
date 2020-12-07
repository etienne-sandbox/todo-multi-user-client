import { useAuth } from "hooks/useAuth";
import { FunctionComponent } from "react";
import { css } from "stitches.config";
import { AnonymousApp } from "./AnonymousApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Layout } from "./Layout";

export const App: FunctionComponent = () => {
  const { loading, user, setToken, logout, authFetcher } = useAuth();

  if (loading) {
    return (
      <Layout
        content={<p className={css({ textAlign: "center" })}>Loading...</p>}
      />
    );
  }

  if (user === null || authFetcher === null) {
    return <AnonymousApp setToken={setToken} />;
  }
  return (
    <AuthenticatedApp me={user} logout={logout} authFetcher={authFetcher} />
  );
};
