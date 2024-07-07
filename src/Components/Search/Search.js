import React, { Component } from 'react';
import { Input, Row } from 'antd';

import ItemMovie from '../ItemMovie/ItemMovie';

export default class Search extends Component {
  render() {
    const { page, query, genres, handleSearch } = this.props;

    return (
      <React.Fragment>
        <Input
          className='app-main-search'
          placeholder='Type to search...'
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <Row gutter={[40, 40]}>
          <ItemMovie page={page} query={query} genres={genres} />
        </Row>
      </React.Fragment>
    );
  }
}
