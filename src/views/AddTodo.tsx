import { memo, useState } from "react";
import { Plus } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { Popover } from "components/Popover";
import { usePopper } from "react-popper";
import { Overlay } from "react-oot";
import * as z from "zod";
import { useMutation, useQueryClient } from "react-query";
import { addTodo, TodoList } from "logic/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthFetcherOrThrow } from "hooks/useAuthFetcher";
import { useMeOrThrow } from "hooks/useMe";
import { useForm } from "react-hook-form";
import { styled } from "stitches.config";
import { ErrorBox } from "components/ErrorBox";
import { Spacer } from "components/Spacer";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { slug } from "cuid";

type Props = {
  listId: string;
};

const AddTodoData = z.object({
  name: z.string().min(1),
});

export const AddTodo = memo<Props>(({ listId }) => {
  const [refEl, setRefEl] = useState<HTMLElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(refEl, popperEl, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
  });

  const [open, setOpen] = useState(false);

  const authFetcher = useAuthFetcherOrThrow();
  const queryClient = useQueryClient();
  const me = useMeOrThrow();

  const addTodoForm = useForm({
    resolver: zodResolver(AddTodoData),
  });

  const { error, isLoading, mutate } = useMutation(
    (data: { listId: string; name: string; done?: boolean }) =>
      addTodo(authFetcher, data),
    {
      onMutate: (data) => {
        queryClient.setQueryData<TodoList>(
          ["list", listId, me.token],
          (old: TodoList | undefined) => {
            if (!old) {
              return old as any;
            }
            return {
              ...old,
              todos: [
                ...old.todos,
                {
                  id: "temp-" + slug(),
                  name: data.name,
                  done: data.done ?? false,
                },
              ],
            };
          }
        );
      },
      onSuccess: ({ id }) => {
        queryClient.invalidateQueries(["list", listId, me.token]);
        addTodoForm.reset();
        setOpen(false);
      },
    }
  );

  const onSubmit = addTodoForm.handleSubmit((values) => {
    mutate({
      listId,
      name: values.name,
    });
  });

  return (
    <>
      <IconButton
        ref={setRefEl}
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
            ref={setPopperEl}
            style={{ ...styles.popper, width: "250px" }}
            {...attributes.popper}
          >
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
                inputRef={addTodoForm.register}
                error={addTodoForm.errors.name}
                disabled={isLoading}
              />
              <Spacer vertical={2} />
              <Button
                type="submit"
                disabled={isLoading}
                text={isLoading ? "Adding..." : "Add"}
              />
            </Form>
          </Popover>
        </Overlay>
      )}
    </>
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
