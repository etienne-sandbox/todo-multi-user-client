import { useAuth } from "hooks/useAuth";
import { FunctionComponent } from "react";
import { styled } from "stitches.config";
import { AnonymousApp } from "./AnonymousApp";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { Layout } from "./Layout";
import { Loader } from "components/Loader";
import { Spacer } from "components/Spacer";

export const App: FunctionComponent = () => {
  const { loading, user, setToken, logout, authFetcher } = useAuth();

  if (loading) {
    return (
      <Layout
        content={
          <Wrapper>
            <Loader size={30} />
            <Spacer vertical={4} />
            <LoaderText>Loading...</LoaderText>
          </Wrapper>
        }
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

const LoaderText = styled.p({
  textAlign: "center",
  fontWeight: "$300",
  fontHeight: "$12",
});

const Wrapper = styled.div({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});
