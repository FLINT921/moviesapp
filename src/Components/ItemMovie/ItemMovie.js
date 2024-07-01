import React, { Component } from "react";
import { Col, Spin, Alert } from "antd";

import "./ItemMovie.css";
import MovieView from "./MovieView";
import SwapiService from "../Services/Swapi-service";

export default class ItemMovie extends Component {
    swapiService = new SwapiService();
    state = {
        movies: [],
        loading: true,
        error: false,
    };

    componentDidMount() {
        const { page, query } = this.props;
        if (query) {
            this.interval = setInterval(this.searchMovie(query, page), 10000);
        } else {
            this.updateMovies(page);
        }
    }

    componentDidUpdate(prevProps) {
        const { page, query } = this.props;
        if (page !== prevProps.page || query !== prevProps.query) {
            this.setState({ loading: true, error: false });
            if (query) {
                this.searchMovie(query, page);
            } else {
                this.updateMovies(page);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    searchMovie(query, page) {
        this.swapiService
            .getSearchMovies(query, page)
            .then((data) => {
                this.setState({
                    movies: data.results,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch movies:", error);
                this.setState({ error: true, loading: false });
            });
    }

    updateMovies(page) {
        this.swapiService
            .getAllMovies(page)
            .then((data) => {
                this.setState({
                    movies: data.results,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error("Failed to fetch movies:", error);
                this.setState({ error: true, loading: false });
            });
    }
    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };
    render() {
        const { movies, loading, error } = this.state;
        const { query } = this.props;
        console.log(movies, loading, error, query);
        const errorMessage = error ? <Alert message="Error 0_0" description="We are solving this problem, come back later" type="error" /> : null;
        const spinner = loading ? <Spin size="large" /> : null;
        const content = (movie, loading) => {
            return !loading ? <MovieView movie={movie} /> : null;
        };
        return (
            <React.Fragment>
                <div className="spinner">{spinner}</div>
                {errorMessage}
                {movies.map((movie) => (
                    <Col key={movie.id} span={12}>
                        <div className="card-movie">{content(movie, loading)}</div>
                    </Col>
                ))}
                {}
            </React.Fragment>
        );
    }
}
