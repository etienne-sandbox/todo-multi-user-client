import { FunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { NotFound } from "./NotFound";

type Props = {
  setToken: (token: string) => void;
};

export const AnonymousApp: FunctionComponent<Props> = ({ setToken }) => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login setToken={setToken} />
      </Route>
      <Route path="/signup" exact>
        <Signup setToken={setToken} />
      </Route>
      <Redirect from="/" exact to="/login" />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};
