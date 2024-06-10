import React, { Component } from "react";
import { MoviesListItem } from "../../MoviesListItem/MoviesListItem";

export class AppMain extends Component {
    render() {
        const { MovieList } = this.props;
        return <MoviesListItem MovieList={MovieList} />;
    }
}
