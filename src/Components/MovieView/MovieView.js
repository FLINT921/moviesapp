import React from 'react';
import { Row, Col, Rate } from 'antd';

const shortText = (text, maxLength = 150) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const getAverage = (element) => {
  let color = null;
  if (element > 0 && element < 3) color = '#E90000';
  else if (element > 3 && element < 5) color = '#E97E00';
  else if (element > 5 && element < 7) color = '#E9D100';
  else if (element > 7) color = '#66E900';

  return (
    <p className='card-movie_average' style={{ border: `2px solid ${color}` }}>
      {Math.round(element * 10) / 10}
    </p>
  );
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
          {getAverage(movie.vote_average)}

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
