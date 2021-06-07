import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Alert from "react-s-alert";
import "../node_modules/react-s-alert/dist/s-alert-css-effects/stackslide.css";
import "../node_modules/react-s-alert/dist/s-alert-default.css";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers (Main pages)
const TheLayout = React.lazy(() => import("./components/TheLayout"));

// Error Pages
const Page404 = React.lazy(() => import("./pages/errors/Page404"));
const Page500 = React.lazy(() => import("./pages/errors/Page500"));

class App extends React.Component {
  render() {
    return (
      <>
        <Alert stack={{ limit: 3 }} />
        <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </>
    );
  }
}

export default App;
