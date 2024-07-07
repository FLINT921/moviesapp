import React, { Component } from 'react';
import { Col, Spin, Alert } from 'antd';

import './ItemMovie.css';
import MovieView from '../MovieView/MovieView';
import SwapiService from '../Services/Swapi-service';

export default class ItemMovie extends Component {
  swapiService = new SwapiService();
  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    const { page, query, currentView } = this.props;
    if (currentView === 'rated') {
      this.updateRatedMovies();
    } else if (query) {
      this.searchMovie(query, page);
    } else {
      this.updateMovies(page);
    }
  }

  componentDidUpdate(prevProps) {
    const { page, query, currentView } = this.props;
    if (page !== prevProps.page || query !== prevProps.query || currentView !== prevProps.currentView) {
      this.setState({ loading: true, error: false });
      if (currentView === 'rated') {
        this.updateRatedMovies();
      } else if (query) {
        this.searchMovie(query, page);
      } else {
        this.updateMovies(page);
      }
    }
  }

  searchMovie(query, page) {
    this.swapiService
      .getSearchMovies(query, page)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Failed to fetch movies:', error);
        this.setState({ error: true, loading: false });
      });
  }

  updateMovies(page) {
    this.swapiService
      .getAllMovies(page)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Failed to fetch movies:', error);
        this.setState({ error: true, loading: false });
      });
  }

  updateRatedMovies() {
    const ratedMovies = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('rate_')) {
        const movieId = key.split('_')[1];
        const rate = localStorage.getItem(key);
        ratedMovies.push({ id: movieId, rate: parseFloat(rate) });
      }
    }

    const moviePromises = ratedMovies.map((ratedMovie) =>
      this.swapiService.getMovie(ratedMovie.id).then((movie) => ({
        ...movie,
        rate: ratedMovie.rate,
      })),
    );

    Promise.all(moviePromises)
      .then((movies) => {
        this.setState({
          movies,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Failed to fetch rated movies:', error);
        this.setState({ error: true, loading: false });
      });
  }

  getGenres(genreIdMovie) {
    const { genres } = this.props;
    return genres.filter((genre) => genreIdMovie && genreIdMovie.includes(genre.id)).map((genre) => genre.name);
  }

  takeRate = (movieId, rate) => {
    localStorage.setItem(`rate_${movieId}`, rate);
  };

  render() {
    const { movies, loading, error } = this.state;
    console.log(movies);
    const errorMessage = error ? (
      <Alert message='Error 0_0' description='We are solving this problem, come back later' type='error' />
    ) : null;
    const spinner = loading ? <Spin size='large' /> : null;
    const content = (movie, loading, genreIdMovie) => {
      return !loading ? <MovieView movie={movie} genreIdMovie={genreIdMovie} takeRate={this.takeRate} /> : null;
    };
    return (
      <React.Fragment>
        <div className='spinner'>{spinner}</div>
        {errorMessage}
        {movies.map((movie) => (
          <Col key={movie.id} span={12}>
            <div className='card-movie'>{content(movie, loading, this.getGenres(movie.genre_ids))}</div>
          </Col>
        ))}
      </React.Fragment>
    );
  }
}
