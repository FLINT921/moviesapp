import React, { Component } from "react";
import "./App.css";
import SwapiService from "../Services/Swapi-service";
import { AppMain } from "../AppMain/AppMain";

export class App extends Component {
    swapiService = new SwapiService();

    state = {
        movies: [],
    };

    constructor() {
        super();
        this.updateMovies();
    }

    updateMovies() {
        this.swapiService
            .getAllMovies()
            .then((data) => {
                this.setState({
                    movies: data.results,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch movies:", error);
            });
    }
    render() {
        const { movies } = this.state;
        console.log(movies);
        return <section className="app-main">{<AppMain movies={movies} />}</section>;
    }
}

export default App;
