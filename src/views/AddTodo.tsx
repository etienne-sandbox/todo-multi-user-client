import { FunctionComponent, useState } from "react";
import { Plus } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { Popover } from "components/Popover";
import { usePopper } from "react-popper";
import { Overlay } from "react-oot";
import { useStateNoUpdate } from "hooks/useStateNoUpdate";
import * as z from "zod";
import { useMutation, useQueryCache } from "react-query";
import { addTodo } from "logic/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthFetcherOrThrow } from "hooks/useAuthFetcher";
import { useMeOrThrow } from "hooks/useMe";
import { useForm } from "react-hook-form";
import { css } from "stitches.config";
import { ErrorBox } from "components/ErrorBox";
import { Spacer } from "components/Spacer";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";

type Props = {
  listId: string;
};

const AddTodoData = z.object({
  name: z.string().min(1),
});

export const AddTodo: FunctionComponent<Props> = ({ listId }) => {
  const [
    referenceElement,
    setReferenceElement,
  ] = useStateNoUpdate<HTMLButtonElement | null>(null);
  const [
    popperElement,
    setPopperElement,
  ] = useStateNoUpdate<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  });

  const [open, setOpen] = useState(false);

  const authFetcher = useAuthFetcherOrThrow();
  const queryCache = useQueryCache();
  const me = useMeOrThrow();

  const addTodoForm = useForm({
    resolver: zodResolver(AddTodoData),
  });

  const [doAddTodo, { error, isLoading }] = useMutation(
    (data: { listId: string; name: string; done?: boolean }) =>
      addTodo(authFetcher, data),
    {
      onSuccess: ({ id }) => {
        queryCache.invalidateQueries(["list", listId, me.token]);
        addTodoForm.reset();
        setOpen(false);
      },
    }
  );

  const onSubmit = addTodoForm.handleSubmit((values) => {
    doAddTodo({
      listId,
      name: values.name,
    });
  });

  return (
    <>
      <IconButton
        ref={setReferenceElement}
        onClick={() => setOpen((prev) => !prev)}
        icon={<Plus size={30} />}
      />
      {open && (
        <Overlay
          onClose={() => setOpen(false)}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
        >
          <Popover
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            css={{ padding: "$04", width: "250px" }}
          >
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
                name="name"
                placeholder="name"
                inputRef={addTodoForm.register}
                error={addTodoForm.errors.name}
                disabled={isLoading}
              />
              <Spacer css={{ height: "$02" }} />
              <Button
                type="submit"
                disabled={isLoading}
                text={isLoading ? "Adding..." : "Add"}
              />
            </form>
          </Popover>
        </Overlay>
      )}
    </>
  );
};
