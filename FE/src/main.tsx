import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { rtkQueryStore } from "./components/rtk-query/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={rtkQueryStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
