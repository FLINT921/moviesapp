import React, { Component } from "react";
import { Row } from "antd";

import "./AppMain.css";

import ItemMovie from "../ItemMovie/ItemMovie";

export class AppMain extends Component {
    render() {
        const { movies } = this.props;
        return (
            <div>
                <Row gutter={[40, 40]}>
                    {movies.map((movie) => (
                        <ItemMovie movie={movie} />
                    ))}
                </Row>
            </div>
        );
    }
}
