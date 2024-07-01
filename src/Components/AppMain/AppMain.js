import React, { Component } from "react";
import { Pagination, Row, Input } from "antd";
import _ from "lodash";
import "./AppMain.css";

import ItemMovie from "../ItemMovie/ItemMovie";

export class AppMain extends Component {
    state = {
        page: 1,
        query: "",
    };
    handleSearch = _.debounce((query) => {
        this.setState({ query: query, page: 1 });
    }, 500);
    render() {
        const { page, query } = this.state;
        const getPage = (page) => {
            this.setState({
                page: page,
            });
        };
        return (
            <React.Fragment>
                <Input
                    className="app-main-search"
                    placeholder="Type to search..."
                    onChange={(e) => {
                        this.handleSearch(e.target.value);
                    }}
                />
                <Row gutter={[40, 40]}>
                    <ItemMovie page={page} query={query} />
                </Row>
                <Pagination className="app-main-pagination" defaultCurrent={1} total={50} onChange={getPage} />
            </React.Fragment>
        );
    }
}
