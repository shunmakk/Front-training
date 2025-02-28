import { http, HttpResponse } from "msw";

export type User = {
  id: number;
  name: string;
};

type CreateUserFormData = Pick<User, "name">;

const userList: User[] = [
  { id: 1, name: "テストユーザー1" },
  { id: 2, name: "テストユーザー2" },
  { id: 3, name: "テストユーザー3" },
  { id: 4, name: "テストユーザー4" },
];

//apiモックの定義
export const handlers = [
  // ユーザー一覧取得api-クエリパラメータの取得
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const userName = url.searchParams.get("name");

    if (!userName) {
      return HttpResponse.json(userList);
    }

    const filteredUserList = userList.filter((user) => {
      return user.name === userName;
    });

    return HttpResponse.json(filteredUserList);
  }),

  //特定のuser取得API
  http.get("/api/users/:userId", ({ params }) => {
    const userId = Number(params.userId);

    //エラーハンドリング
    if (!userId) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "bad request",
      });
    }

    const user = userList.filter((item) => {
      return item.id === Number(userId);
    })[0];

    //エラーハンドリング
    if (!user) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "no resource",
      });
    }

    return HttpResponse.json(user);
  }),

  //ユーザー作成API
  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as CreateUserFormData;
    const newUser: User = { id: userList.length + 1, name: body.name };
    userList.push(newUser);

    //空のレスポンス返却
    return new HttpResponse(null, {
      status: 201,
      statusText: "success",
    });
  }),

  //cokkieの取得と送信
  http.get("resource", async ({ cookies }) => {
    //cokkieの値
    console.log(cookies.mySecret);

    //cokkieの送信
    return HttpResponse.json(null, {
      status: 201,
      statusText: "success",
      headers: {
        "Set-Cookie": "mySecret=abc-123",
      },
    });
  }),
];
