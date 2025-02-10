/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';

import options from './fetchOptions';

const GenresContext = createContext();

function GenresProvider({ children }) {
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((res) => res.json())
      .then((data) => {
        setAllGenres(data.genres);
      })
      .catch((err) => console.error(err));
  }, []);

  return <GenresContext.Provider value={{ allGenres }}>{children}</GenresContext.Provider>;
}

export { GenresProvider, GenresContext };
