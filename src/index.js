import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
