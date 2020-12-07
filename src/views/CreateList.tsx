import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createList } from "logic/api";
import { useMutation, useQueryCache } from "react-query";
import { css } from "stitches.config";
import { Title } from "components/Title";
import { ErrorBox } from "components/ErrorBox";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { useAuthFetcherOrThrow } from "hooks/useAuthFetcher";
import { useMeOrThrow } from "hooks/useMe";
import { useHistory } from "react-router-dom";

const CreateListFormData = z.object({
  name: z.string().min(1),
});

export const CreateList: FunctionComponent = () => {
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
          <Title>Create List</Title>
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
              disabled={isLoading}
            />
            <div className={css({ height: "$02" })} />
            <Button type="submit" disabled={isLoading} text="Create" />
          </form>
        </div>
      }
    />
  );
};
