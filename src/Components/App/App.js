import React, { Component } from "react";
import "./App.css";
import { AppMain } from "../AppMain/AppMain";

export default class App extends Component {
    render() {
        return <section className="app-main">{<AppMain />}</section>;
    }
}
