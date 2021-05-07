import { lazy } from "react";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const routes = {
  home: {
    name: "PreSeason Planner",
    path: "/",
    exact: true,
    public: true,
    private: false,
    component: lazy(() => import("./../pages/Homepage/Homepage")),
  },
};

export const renderRoutes = Object.entries(routes);
