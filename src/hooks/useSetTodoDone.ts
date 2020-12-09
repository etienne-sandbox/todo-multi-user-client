import { useMutation, useQueryCache } from "react-query";
import { setTodoDone, TodoList } from "logic/api";
import { useAuthFetcherOrThrow } from "./useAuthFetcher";
import { useMeOrThrow } from "./useMe";

export function useSetTodoDone(listId: string) {
  const fetcher = useAuthFetcherOrThrow();
  const queryCache = useQueryCache();
  const me = useMeOrThrow();

  return useMutation(
    (data: { todoId: string; done: boolean }) => {
      return setTodoDone(fetcher, { listId, ...data });
    },
    {
      onMutate: (data) => {
        queryCache.setQueryData<TodoList>(["list", listId, me.token], (old) => {
          if (!old) {
            return old as any;
          }
          return {
            ...old,
            todos: [
              ...old.todos.map((prev) => {
                if (prev.id !== data.todoId) {
                  return prev;
                }
                return {
                  ...prev,
                  done: data.done,
                };
              }),
            ],
          };
        });
      },
      onSuccess: () => {
        queryCache.invalidateQueries(["list", listId, me.token]);
      },
    }
  );
}
