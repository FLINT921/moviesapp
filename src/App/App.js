import React, { Component } from "react";
import "./App.css";
import { AppMain } from "../AppMain/AppMain";

export class App extends Component {
    render() {
        return (
            <section className="app-main">
                <AppMain />
            </section>
        );
    }
}

export default App;
