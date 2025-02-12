import options from './fetchOptions';

export default class DataFetcher {
  static async getMovies(query, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
      options
    );

    if (!res.ok) {
      throw new Error(`Could not fetch! received status ${res.status}`);
    }
    return res.json();
  }

  static async getSession() {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);

    if (!res.ok) {
      throw new Error(`Could not create new guest session! received status ${res.status}`);
    }
    return res.json();
  }

  static async getGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

    if (!res.ok) {
      throw new Error(`Could not create the list of genres - received status ${res.status}`);
    }
    return res.json();
  }

  static async getRatedMovies(pageNumber = 1) {
    const storedSession = localStorage.getItem('guest_session_id');
    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${storedSession}/rated/movies?language=en-US&page=${pageNumber}&sort_by=created_at.asc`,
      options
    );

    if (!res.ok) {
      throw new Error(`Could not get the list of movies rated in this session - received status ${res.status}`);
    }
    return res.json();
  }
}
