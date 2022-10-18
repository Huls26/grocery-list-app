import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import "./index.css";

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <Routes />
    </React.StrictMode>
)