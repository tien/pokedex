import "./styles/index.css";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
