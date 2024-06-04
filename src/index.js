import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const fetch = require("node-fetch");

const url = "https://api.themoviedb.org/3/configuration";
const options = { method: "GET", headers: { accept: "application/json" } };

fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));
