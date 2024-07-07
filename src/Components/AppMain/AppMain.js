import React, { Component } from 'react';
import { Pagination, Row, Col } from 'antd';
import _ from 'lodash';

import './AppMain.css';
import SwapiService from '../Services/Swapi-service';
import Search from '../Search/Search';
import Rated from '../Rated/Rated';

export class AppMain extends Component {
  swapiService = new SwapiService();
  state = {
    page: 1,
    query: '',
    genres: [],
    currentView: 'search',
  };

  constructor(props) {
    super(props);
    this.getGenre();
  }

  handleSearch = _.debounce((query) => {
    this.setState({ query: query, page: 1 });
  }, 500);

  getGenre() {
    this.swapiService
      .getGenre()
      .then((data) => {
        this.setState({
          genres: data.genres,
        });
      })
      .catch((error) => {
        console.error('Failed to fetch genres', error);
      });
  }

  drawPage = () => {
    const { page, query, genres, currentView } = this.state;
    if (currentView === 'search') {
      return <Search page={page} query={query} genres={genres} handleSearch={this.handleSearch} />;
    }
    if (currentView === 'rated') {
      return <Rated page={page} genres={genres} currentView={currentView} />;
    }
    return null;
  };

  setView = (view) => {
    this.setState({ currentView: view });
  };

  render() {
    const { currentView } = this.state;
    const getPage = (page) => {
      this.setState({
        page: page,
      });
    };

    return (
      <React.Fragment>
        <Row className='center'>
          <Col>
            <button
              className={`app-main-button ${currentView === 'search' ? 'active' : ''}`}
              onClick={() => this.setView('search')}
            >
              Search
            </button>
          </Col>
          <Col>
            <button
              className={`app-main-button ${currentView === 'rated' ? 'active' : ''}`}
              onClick={() => this.setView('rated')}
            >
              Rated
            </button>
          </Col>
        </Row>
        {this.drawPage()}
        <Pagination className='app-main-pagination' align='center' defaultCurrent={1} total={50} onChange={getPage} />
      </React.Fragment>
    );
  }
}
