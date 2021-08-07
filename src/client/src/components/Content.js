import { CContainer, CFade } from "@coreui/react";
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// routes config
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

class Content extends React.Component {
  static getDerivedStateFromProps() {
    return {
      isLoginModalOpen: true,
    };
  }

  render() {
    return (
      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={loading}>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          {this.props.width100Callback(!!route.width100)}
                          <route.component {...props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
              <Redirect from="/" to="/pages/home" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>
    );
  }
}

// only renders if props have changed
export default Content;
