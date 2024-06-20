import React, { Component } from "react";
import { Row } from "antd";

import "./AppMain.css";

import ItemMovie from "../ItemMovie/ItemMovie";

export class AppMain extends Component {
    render() {
        return (
            <Row gutter={[40, 40]}>
                    <ItemMovie />
            </Row>
        );
    }
}
