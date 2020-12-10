import { memo } from "react";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { FormLayout } from "components/FormLayout";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";
import { Layout } from "./Layout";
import { useMutation } from "react-query";
import { signup } from "logic/api";
import { ErrorBox } from "components/ErrorBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Spacer } from "components/Spacer";
import { useFetcherOrThrow } from "hooks/useFetcher";

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

export const Signup = memo<Props>(({ setToken }) => {
  const fetcher = useFetcherOrThrow();

  const [doSignup, { error, isLoading }] = useMutation(
    (data: { name: string; username: string; password: string }) =>
      signup(fetcher, data),
    {
      onSuccess: ({ token }) => {
        setToken(token);
      },
    }
  );

  const { register, handleSubmit, errors } = useForm({
    mode: "onTouched",
    resolver: zodResolver(SignupFormData),
  });

  const onSubmit = handleSubmit((values) => {
    doSignup(values);
  });

  return (
    <Layout
      content={
        <FormLayout title="Signup">
          <Form onSubmit={onSubmit}>
            {error && (
              <>
                <ErrorBox error={error} />
                <Spacer vertical={2} />
              </>
            )}
            <TextInput
              name="name"
              placeholder="name"
              inputRef={register}
              error={errors.name}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput
              type="text"
              name="username"
              placeholder="username"
              inputRef={register}
              error={errors.username}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              error={errors.password}
              inputRef={register}
              disabled={isLoading}
            />
            <Spacer vertical={[1, 0]} />
            <Button type="submit" text="Signup" disabled={isLoading} />
          </Form>
          <Spacer vertical={[1, 0]} />
          <InfoText>
            Already have an account ? <Link to="/login">Login here</Link>
          </InfoText>
        </FormLayout>
      }
    />
  );
});

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  alignSelf: "center",
  maxWidth: 300,
  width: "100%",
});

const InfoText = styled.p({
  textAlign: "center",
  fontWeight: "$300",
  lineHeight: "$10",
});
