import React from 'react';
import { Row, Col, Rate } from 'antd';

const shortText = (text, maxLength = 150) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const MovieView = ({ movie, genreIdMovie, takeRate }) => {
  const valueRate = localStorage.getItem(`rate_${movie.id}`) ? parseFloat(localStorage.getItem(`rate_${movie.id}`)) : 0;

  return (
    <React.Fragment>
      <Row>
        <Col span={10}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
        </Col>
        <Col className='card-movie_text' span={13}>
          <h2 className='card-movie_title'>{movie.title}</h2>
          <p className='card-movie_date'>{movie.release_date}</p>
          <Row className='card-movie_genre' gutter={8}>
            {genreIdMovie.map((name, index) => (
              <Col className='card-movie_genre-item' key={index}>
                <p>{name}</p>
              </Col>
            ))}
          </Row>
          <p className='card-movie_overview'>{shortText(movie.overview)}</p>
          <Rate
            className='card-movie_rate'
            count={10}
            defaultValue={valueRate}
            onChange={(value) => takeRate(movie.id, value)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MovieView;
