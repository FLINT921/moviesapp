import React, { Component } from "react";
import { MovieItem } from "../MovieItem/MovieItem";

import "./MoviesListItem.css";

export class MoviesListItem extends Component {
    render() {
        const { MovieList } = this.props;
        return (
            <div className="movies-list-item">
                <MovieList />
            </div>
        );
    }
}
