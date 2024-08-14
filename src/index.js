import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
import reportWebVitals from "./reportWebVitals";

import "./tailwind.scss";
import "primeicons/primeicons.css";
// import "./index.scss";
// import "primereact/resources/themes/lara-light-green/theme.css";
// import "primereact/resources/primereact.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
