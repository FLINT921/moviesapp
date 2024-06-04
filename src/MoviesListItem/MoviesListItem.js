import React, { Component } from "react";
import { MovieItem } from "../MovieItem/MovieItem";
import { Col, Row } from "antd";

import "./MoviesListItem.css";

export class MoviesListItem extends Component {
    render() {
        return (
            <div className="movies-list-item">
                <Row>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                    <Col xs={12}>
                        <MovieItem />
                    </Col>
                </Row>
            </div>
        );
    }
}
