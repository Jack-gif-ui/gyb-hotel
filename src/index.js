import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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
    <App />
  </ConfigProvider>
);
