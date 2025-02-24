import { http, HttpResponse } from "msw";

export type User = {
  id: number;
  name: string;
};

const userList: User[] = [
  { id: 1, name: "テストユーザー1" },
  { id: 2, name: "テストユーザー2" },
  { id: 3, name: "テストユーザー3" },
  { id: 4, name: "テストユーザー4" },
];

//apiモックの定義
export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(userList);
  }),

  //serListの中から、パスパラメータのuserIdに紐づくユーザーをレスポンスとして返
  http.get("/api/users/:userId", ({ params }) => {
    const userId = Number(params.userId);
    const user = userList.filter((item) => {
      return item.id === Number(userId);
    })[0];
    return HttpResponse.json(user);
  }),
];
