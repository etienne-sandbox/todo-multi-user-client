import { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createList } from "logic/api";
import { useMutation, useQueryCache } from "react-query";
import { styled } from "stitches.config";
import { Title } from "components/Title";
import { ErrorBox } from "components/ErrorBox";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { useAuthFetcherOrThrow } from "hooks/useAuthFetcher";
import { useMeOrThrow } from "hooks/useMe";
import { useHistory } from "react-router-dom";
import { Spacer } from "components/Spacer";

const CreateListFormData = z.object({
  name: z.string().min(1),
});

export const CreateList = memo(() => {
  const authFetcher = useAuthFetcherOrThrow();
  const queryCache = useQueryCache();
  const me = useMeOrThrow();
  const history = useHistory();

  const [doLogin, { error, isLoading }] = useMutation(
    (data: { name: string }) => createList(authFetcher, data),
    {
      onSuccess: ({ id }) => {
        queryCache.invalidateQueries(["lists", me.token]);
        history.push(`/list/${id}`);
      },
    }
  );

  const { register, handleSubmit, errors } = useForm({
    resolver: zodResolver(CreateListFormData),
  });

  const onSubmit = handleSubmit((values) => {
    doLogin(values);
  });

  return (
    <AuthenticatedLayout
      back={true}
      content={
        <Wrapper>
          <Title>Create List</Title>
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
            <Button type="submit" disabled={isLoading} text="Create" />
          </Form>
        </Wrapper>
      }
    />
  );
});

const Wrapper = styled.div({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  paddingLeft: "$02",
  paddingRight: "$02",
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
