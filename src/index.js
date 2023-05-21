import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./redux/index";
import { Provider } from "react-redux";

import "./index.css";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#b37feb",
      },
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
