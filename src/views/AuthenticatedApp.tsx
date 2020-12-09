import { AuthFetcher, User } from "logic/api";
import React, { FunctionComponent, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { MeContext } from "hooks/useMe";
import { LogoutContext } from "hooks/useLogout";
import { AuthFetcherContext } from "hooks/useAuthFetcher";

type Props = {
  me: User;
  logout: () => void;
  authFetcher: AuthFetcher;
};

const AsyncHome = lazy(() =>
  import("./Home").then((m) => ({ default: m.Home }))
);
const AsyncCreateList = lazy(() =>
  import("./CreateList").then((m) => ({ default: m.CreateList }))
);
const AsyncList = lazy(() =>
  import("./List").then((m) => ({ default: m.List }))
);

export const AuthenticatedApp: FunctionComponent<Props> = ({
  me,
  logout,
  authFetcher,
}) => {
  return (
    <LogoutContext.Provider value={logout}>
      <AuthFetcherContext.Provider value={authFetcher}>
        <MeContext.Provider value={me}>
          <Switch>
            <Route path="/" exact render={() => <AsyncHome />} />
            <Route path="/create" exact render={() => <AsyncCreateList />} />
            <Route
              path="/list/:listId"
              exact
              render={({ match }) => <AsyncList listId={match.params.listId} />}
            />
            <Redirect from="/signup" exact to="/" />
            <Redirect from="/login" exact to="/" />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </MeContext.Provider>
      </AuthFetcherContext.Provider>
    </LogoutContext.Provider>
  );
};
