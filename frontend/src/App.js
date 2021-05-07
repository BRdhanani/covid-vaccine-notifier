import { Suspense } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Switch, Route, Router } from "react-router-dom";
import { Spin } from "antd";
import { renderRoutes } from "./config/routes";
import { history } from "./config/routes";

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="loader">
            <Spin size="large" />
          </div>
        }
      >
        <Router history={history}>
          <Switch>
            {renderRoutes.map(([key, route]) => (
              <Route
                key={key}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
