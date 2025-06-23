import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Alert } from 'antd';

import FetchData from './FetchData.js';

const GenresContext = createContext(null);

function GenresProvider({ children }) {
  const [allGenres, setAllGenres] = useState(new Map());
  const [errorMessage, setErrorMessage] = useState(null);
  const memoizedGenres = useMemo(() => allGenres, [allGenres]);

  const getGenres = useCallback(async () => {
    try {
      const data = await FetchData.getGenres();
      const entriesArray = data.genres.map((genre) => [genre.id, genre.name]);
      setAllGenres(new Map(entriesArray));
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  if (errorMessage) {
    return (
      <div className="error">
        <Alert message={`Could not fetch movie genres: ${errorMessage}`} type="error" closable />
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <GenresContext.Provider value={{ memoizedGenres }}>{children}</GenresContext.Provider>;
}

export { GenresProvider, GenresContext };
