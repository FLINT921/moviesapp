import React, { Component } from "react";
import { Pagination, Row, Input } from "antd";

import "./AppMain.css";

import ItemMovie from "../ItemMovie/ItemMovie";

const { Search } = Input;
export class AppMain extends Component {
    state = {
        page: 1,
        query: "",
    };
    handleSearch = (query) => {
        console.log(query);
        this.setState({ query, page: 1 });
    };
    render() {
        const { page } = this.state;
        const getPage = (page) => {
            this.setState({
                page: page,
            });
        };
        return (
            <React.Fragment>
                <Search placeholder="Type to search..." onChange={this.handleSearch} />
                <Row gutter={[40, 40]}>
                    <ItemMovie page={page} />
                </Row>
                <Pagination defaultCurrent={1} total={50} onChange={getPage} />
            </React.Fragment>
        );
    }
}
