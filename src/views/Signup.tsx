import { Title } from "components/Title";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { css } from "stitches.config";
import { Layout } from "./Layout";
import { useMutation } from "react-query";
import { signup } from "logic/api";
import { ErrorBox } from "components/ErrorBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DevTool } from "@hookform/devtools";

const SignupFormData = z.object({
  username: z
    .string()
    .regex(/[A-Za-z0-9_-]+/, 'Must only conatins letter, digit, "-" and "_"'),
  password: z.string().min(6),
  name: z.string().min(3),
});

type Props = {
  setToken: (token: string) => void;
};

export const Signup: FunctionComponent<Props> = ({ setToken }) => {
  const [doSignup, { error }] = useMutation(signup, {
    onSuccess: ({ token }) => {
      setToken(token);
    },
  });

  const { register, handleSubmit, control, errors } = useForm({
    mode: "onTouched",
    resolver: zodResolver(SignupFormData),
  });

  const onSubmit = handleSubmit((values) => {
    doSignup(values);
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
          <Title>Signup</Title>
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
                <div className={css({ height: "$02" })} />
              </>
            )}
            <TextInput
              name="name"
              placeholder="name"
              inputRef={register}
              error={errors.name}
            />
            <div className={css({ height: "$02" })} />
            <TextInput
              type="text"
              name="username"
              placeholder="username"
              inputRef={register}
              error={errors.username}
            />
            <div className={css({ height: "$02" })} />
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              error={errors.password}
              inputRef={register}
            />
            <div className={css({ height: "$10" })} />
            <Button type="submit" text="Signup" />
          </form>
          <div className={css({ height: "$10" })} />
          <p className={css({ textAlign: "center" })}>
            Already have an account ? <Link to="/login">Login here</Link>
          </p>
          <DevTool control={control} />
        </div>
      }
    />
  );
};
