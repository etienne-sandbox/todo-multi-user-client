import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Layout } from "./Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "logic/api";
import { useMutation } from "react-query";
import { css } from "stitches.config";
import { Title } from "components/Title";
import { ErrorBox } from "components/ErrorBox";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { Spacer } from "components/Spacer";

const LoginFormData = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type Props = {
  setToken: (token: string) => void;
};

export const Login: FunctionComponent<Props> = ({ setToken }) => {
  const [doLogin, { error, isLoading }] = useMutation(login, {
    onSuccess: ({ token }) => {
      setToken(token);
    },
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: zodResolver(LoginFormData),
  });

  const onSubmit = handleSubmit((values) => {
    doLogin(values);
  });

  return (
    <Layout
      content={
        <div
          className={css({
            display: "flex",
            flex: "1",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            paddingLeft: "$02",
            paddingRight: "$02",
          })}
        >
          <Title>Login</Title>
          <form
            onSubmit={onSubmit}
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "center",
              alignSelf: "center",
              maxWidth: 300,
              width: "100%",
            })}
          >
            {error && (
              <>
                <ErrorBox error={error} />
                <Spacer css={{ height: "$02" }} />
              </>
            )}
            <TextInput
              name="username"
              placeholder="username"
              inputRef={register}
              error={errors.username}
              disabled={isLoading}
            />
            <Spacer css={{ height: "$02" }} />
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              error={errors.password}
              inputRef={register}
              disabled={isLoading}
            />
            <Spacer css={{ height: "$10" }} />
            <Button type="submit" disabled={isLoading} text="Login" />
          </form>
          <Spacer css={{ height: "$10" }} />
          <p className={css({ textAlign: "center" })}>
            Don't have an account ? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      }
    />
  );
};
