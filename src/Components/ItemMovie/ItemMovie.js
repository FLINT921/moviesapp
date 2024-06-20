import React, { Component } from "react";
import { Col } from "antd";

import "./ItemMovie.css";
import Spinner from "../Spinner/Spinner";
import MovieView from "./MovieView";
import SwapiService from "../Services/Swapi-service";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";

export default class ItemMovie extends Component {
    swapiService = new SwapiService();

    state = {
        movies: [],
        loading: true,
        error: false,
    };

    constructor(props) {
        super(props);
        this.updateMovies();
    }

    updateMovies() {
        this.swapiService
            .getAllMovies()
            .then((data) => {
                this.setState({
                    movies: data.results,
                    loading: false,
                });
            })
            .catch(this.onError);
    }

    content = (movie, loading) => {
        return !loading ? <MovieView movie={movie} /> : null;
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    render() {
        const { movies, loading, error } = this.state;
        console.log(movies);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorIndicator /> : null;

        return movies.map((movie) => (
            <Col key={movie.id} span={12}>
                <div className="card-movie">
                    {errorMessage}
                    {spinner}
                    {this.content(movie, loading)}
                </div>
            </Col>
        ));
    }
}
