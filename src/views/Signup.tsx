import { FunctionComponent } from "react";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { FormLayout } from "components/FormLayout";
import { Link } from "react-router-dom";
import { css, styled } from "stitches.config";
import { Layout } from "./Layout";
import { useMutation } from "react-query";
import { signup } from "logic/api";
import { ErrorBox } from "components/ErrorBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Spacer } from "components/Spacer";

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
            />
            <Spacer vertical={2} />
            <TextInput
              type="text"
              name="username"
              placeholder="username"
              inputRef={register}
              error={errors.username}
            />
            <Spacer vertical={2} />
            <TextInput
              type="password"
              name="password"
              placeholder="password"
              error={errors.password}
              inputRef={register}
            />
            <Spacer vertical={[1, 0]} />
            <Button type="submit" text="Signup" />
          </Form>
          <Spacer vertical={[1, 0]} />
          <InfoText>
            Already have an account ? <Link to="/login">Login here</Link>
          </InfoText>
        </FormLayout>
      }
    />
  );
};

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
