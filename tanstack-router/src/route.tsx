import {
  createRootRoute,
  createRouter,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import App from "./App";
import { Layout } from "./Layout";

const rootRoute = createRootRoute({
  //404の場合
  notFoundComponent: () => <div>404ERROR ページが見つかりません</div>,
});

//ルーティングの設定
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const appRoute = createRoute({
  getParentRoute: () => indexRoute,
  //動的ルーティング
  //   path: "/$app",
  path: "/app",
  component: () => <App />,
  pendingComponent: () => <div>ローディング...</div>,
  errorComponent: () => <div>残念エラー発生</div>,
});

const routeTree = rootRoute.addChildren([indexRoute.addChildren([appRoute])]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
