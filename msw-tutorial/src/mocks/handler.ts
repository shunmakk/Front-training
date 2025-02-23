import { http, HttpResponse } from "msw";

//apiモックの定義
export const handlers = [
  http.get("/resource", () => {
    return HttpResponse.json({ text: "ハローワールド" });
  }),
];
