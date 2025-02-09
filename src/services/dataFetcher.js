/* eslint-disable no-console */

export default class dataFetcher {
  constructor() {
    this.fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYmY1MDg5MzVhMmE0NjgyYjVkOWEwNGRmMjU0N2UxYyIsIm5iZiI6MTczNzk2NzM4Ny44NDQsInN1YiI6IjY3OTc0NzFiMjVkMjk4MGZiMDI0MTAzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dVQywg_L4awk_qwvZ9urszknUCPZhU7cqkA1zEzOZ4c',
      },
    };
  }

  static async getMovies(query, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      this.fetchOptions
    );

    if (!res.ok) {
      throw new Error(`Could not fetch! received status ${res.status}`);
    }
    return res.json();
  }

  static async getSession() {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', this.fetchOptions);

    if (!res.ok) {
      throw new Error(`Could not create new guest session! received status ${res.status}`);
    }
    return res.json();
  }

  static async getGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', this.fetchOptions);

    if (!res.ok) {
      throw new Error(`Could not create the list of genres - received status ${res.status}`);
    }
    return res.json();
  }
}
