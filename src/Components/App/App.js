import React, { Component, useState, useEffect } from "react";
import "./App.css";
import { AppMain } from "../AppMain/AppMain";

class SwapiService {
    async getResource(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        const body = await res.json();
        return body;
    }

    async getMovie() {
        return this.getResource("https://api.themoviedb.org/3/discover/movie?api_key=8a726082f3d83f3df0b09bbac8ae3d31");
    }
}

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const swapiService = new SwapiService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await swapiService.getMovie();
                setMovieList(movies.results); // Assuming the API response has a 'results' field
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movieList.map((movie) => (
                    <li key={movie.episode_id}>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export class App extends Component {
    render() {
        return (
            <section className="app-main">
                <AppMain />
            </section>
        );
    }
}

export default App;
