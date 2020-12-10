import Ky from "ky";

export type User = {
  id: string;
  token: string;
  name: string;
  username: string;
};

export type Fetcher = typeof Ky;

export function createFetcher(port: string): Fetcher {
  return Ky.create({
    prefixUrl: `http://localhost:${port}`,
    hooks: {
      afterResponse: [
        async (request, options, response) => {
          if (response.ok) {
            return response;
          }
          const json = await response.json();
          (response as any).parsed = json;
          return response;
        },
      ],
    },
  });
}

export function createAuthFetcher(fetcher: Fetcher, token: string) {
  return fetcher.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getMe(authFetcher: Fetcher) {
  return authFetcher.get("me").json<User>();
}

export async function getMeLists(authFetcher: Fetcher) {
  return authFetcher
    .get("lists")
    .json<Array<{ id: string; name: string; userIds: Array<string> }>>();
}

export async function signup(
  fetcher: Fetcher,
  data: {
    name: string;
    username: string;
    password: string;
  }
) {
  return fetcher
    .post("action/signup", {
      json: data,
    })
    .json<{ token: string }>();
}

export async function login(
  fetcher: Fetcher,
  data: { username: string; password: string }
) {
  return fetcher
    .post("action/login", {
      json: data,
    })
    .json<{ token: string }>();
}

export async function createList(authFetcher: Fetcher, data: { name: string }) {
  return authFetcher
    .post("action/create-list", {
      json: data,
    })
    .json<{ id: string }>();
}

export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

export interface TodoList {
  id: string;
  name: string;
  todos: Array<Todo>;
  userIds: Array<string>;
}

export async function getList(authFetcher: Fetcher, listId: string) {
  return authFetcher.get(`list/${listId}`).json<TodoList>();
}

export async function addTodo(
  authFetcher: Fetcher,
  data: { listId: string; name: string; done?: boolean }
) {
  return authFetcher
    .post("action/add-todo", {
      json: data,
    })
    .json<{ id: string }>();
}

export async function setTodoDone(
  authFetcher: Fetcher,
  data: { listId: string; todoId: string; done: boolean }
) {
  const res = await authFetcher.post("action/set-todo-done", {
    json: data,
  });
  if (res.status !== 204) {
    throw new Error("Invalid response status");
  }
  return;
}
