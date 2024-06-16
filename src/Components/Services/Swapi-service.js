export default class SwapiService {
    _apiBase = "https://api.themoviedb.org/3";
    _apiKey = "?api_key=8a726082f3d83f3df0b09bbac8ae3d31";
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}${this._apiKey}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    getAllMovies() {
        return this.getResource(`/discover/movie`);
    }

    getMovie(id) {
        return this.getResource(`/movie/${id}`);
    }
}
