/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'antd';

import FetchData from './FetchData.js';

const GenresContext = createContext();

function GenresProvider({ children }) {
  const [allGenres, setAllGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  async function getGenres() {
    const data = await FetchData.getGenres();
    setAllGenres(data.genres);
  }

  useEffect(() => {
    try {
      getGenres();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);
  if (errorMessage) {
    return (
      <div className="error">
        <Alert message={`Could not fetch movie genres: ${errorMessage}`} type="error" closable />
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <GenresContext.Provider value={{ allGenres }}>{children}</GenresContext.Provider>;
}

export { GenresProvider, GenresContext };
