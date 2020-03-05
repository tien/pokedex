import "./styles/index.css";

import React from "react";
import { render, hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");

(rootElement?.hasChildNodes() ?? false ? hydrate : render)(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  rootElement
);

serviceWorker.unregister();
