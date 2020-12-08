import { AuthFetcher, User } from "logic/api";
import React, { FunctionComponent } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { MeContext } from "hooks/useMe";
import { LogoutContext } from "hooks/useLogout";
import { AuthFetcherContext } from "hooks/useAuthFetcher";
import { CreateList } from "./CreateList";
import { List } from "./List";

type Props = {
  me: User;
  logout: () => void;
  authFetcher: AuthFetcher;
};

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
            <Route path="/" exact render={() => <Home />} />
            <Route path="/create" exact render={() => <CreateList />} />
            <Route
              path="/list/:listId"
              exact
              render={({ match }) => <List listId={match.params.listId} />}
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
