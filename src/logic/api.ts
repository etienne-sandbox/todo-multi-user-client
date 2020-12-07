import Ky from "ky";

export type User = {
  id: string;
  token: string;
  name: string;
  username: string;
};

const fetcher = Ky.create({
  prefixUrl: "http://localhost:3001",
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

export type AuthFetcher = ReturnType<typeof createAuthFetcher>;

export const createAuthFetcher = (token: string) => {
  return fetcher.create({
    prefixUrl: "http://localhost:3001",
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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function getMe(fetcher: AuthFetcher) {
  return fetcher.get("me").json<User>();
}

export async function getMeLists(fetcher: AuthFetcher) {
  return fetcher
    .get("lists")
    .json<Array<{ id: string; name: string; userIds: Array<string> }>>();
}

export async function signup(data: {
  name: string;
  username: string;
  password: string;
}) {
  return fetcher
    .post("action/signup", {
      json: data,
    })
    .json<{ token: string }>();
}

export async function login(data: { username: string; password: string }) {
  return fetcher
    .post("action/login", {
      json: data,
    })
    .json<{ token: string }>();
}

export async function createList(fetcher: AuthFetcher, data: { name: string }) {
  return fetcher
    .post("action/create-list", {
      json: data,
    })
    .json<{ id: string }>();
}
