import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import Loading from "./shared/components/UIElements/Loading";

ReactDOM.render(
  <Suspense fallback={<Loading page="true" />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
