import React, { Component } from 'react';
import { Row } from 'antd';

import ItemMovie from '../ItemMovie/ItemMovie';

export default class Rated extends Component {
  render() {
    const { page, genres, currentView } = this.props;

    return (
      <React.Fragment>
        <Row gutter={[40, 40]}>
          <ItemMovie page={page} genres={genres} currentView={currentView} />
        </Row>
      </React.Fragment>
    );
  }
}
