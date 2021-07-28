import React from "react";
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

