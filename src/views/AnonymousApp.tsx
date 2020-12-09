import { memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";

type Props = {
  setToken: (token: string) => void;
};

export const AnonymousApp = memo<Props>(({ setToken }) => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login setToken={setToken} />
      </Route>
      <Route path="/signup" exact>
        <Signup setToken={setToken} />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
});
