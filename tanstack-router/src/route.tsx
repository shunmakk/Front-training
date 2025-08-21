import {
  createRootRoute,
  createRouter,
  createRoute,
  Outlet,
} from "@tanstack/react-router";
import App from "./App";
import { Layout } from "./Layout";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";

const Loading = () => {
  return <>ローディング...</>;
};

const Error = () => {
  return <>残念エラー発生</>;
};

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
  pendingComponent: Loading,
  errorComponent: Error,
});

const page1Route = createRoute({
  getParentRoute: () => indexRoute,
  path: "/page1",
  component: () => <Page1 />,
  pendingComponent: () => Loading,
  errorComponent: () => Error,
});

const page2Route = createRoute({
  getParentRoute: () => indexRoute,
  path: "/page2",
  component: () => <Page2 />,
  pendingComponent: () => Loading,
  errorComponent: () => Error,
});

const page3Route = createRoute({
  getParentRoute: () => indexRoute,
  path: "/page3",
  component: () => <Page3 />,
  pendingComponent: () => <div>ローディング...</div>,
  errorComponent: () => <div>残念エラー発生</div>,
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([appRoute, page1Route, page2Route, page3Route]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
