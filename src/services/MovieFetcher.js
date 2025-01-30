export default class MovieFetcher {
  static async getMovies(query) {
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmY1MDg5MzVhMmE0NjgyYjVkOWEwNGRmMjU0N2UxYyIsIm5iZiI6MTczNzk2NzM4Ny44NDQsInN1YiI6IjY3OTc0NzFiMjVkMjk4MGZiMDI0MTAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVQywg_L4awk_qwvZ9urszknUCPZhU7cqkA1zEzOZ4c',
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      fetchOptions
    );

    if (!res.ok) {
      throw new Error(`Could not fetch! received status ${res.status}`);
    }
    return res.json();
  }

  static async getData(query) {
    const res = await this.getMovies(query);
    return res.results.slice(0, 10);
  }
}
