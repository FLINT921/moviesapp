import React from "react";
import { Col, Row } from "antd";

const shortText = (text) => {
    if (text.length > 200) {
        const trimmedText = text.slice(0, 200);
        const lastSpaceIndex = trimmedText.lastIndexOf(" ");
        if (lastSpaceIndex > -1) {
            return trimmedText.slice(0, lastSpaceIndex) + "...";
        }
        return trimmedText + "...";
    }
    return text;
};

const MovieView = ({ movie }) => {
    return (
        <React.Fragment>
            <Row>
                <Col span={10}>
                    <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                </Col>
                <Col className="card-movie_text" span={13}>
                    <h2 className="card-movie_title">{movie.title}</h2>
                    <p className="card-movie_date">{movie.release_date}</p>
                    <Row className="card-movie_genre" gutter={8}>
                        <Col span={6}>
                            <p className="card-movie_genre-item">Action</p>
                        </Col>
                        <Col span={6}>
                            <p className="card-movie_genre-item">Action</p>
                        </Col>
                    </Row>
                    <p className="card-movie_overview">{shortText(movie.overview)}</p>
                </Col>
            </Row>
            ;
        </React.Fragment>
    );
};
export default MovieView;
