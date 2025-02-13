/* eslint-disable no-console */

import fetchOptions from './fetchOptions.js';

const postRating = async (value, movieID) => {
  const storedRatings = JSON.parse(localStorage.getItem('myRatings'));
  const myRatings = JSON.stringify({ ...storedRatings, [movieID]: value });
  localStorage.setItem('myRatings', myRatings);

  const sessionID = localStorage.getItem('guestSessionID');

  const optionsWithValue = {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ value }),
    headers: { ...fetchOptions.headers, 'Content-Type': 'application/json;charset=utf-8' },
  };

  fetch(`https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${sessionID}`, optionsWithValue)
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        throw new Error(data.status_message);
      }
    })
    .catch((err) => {
      console.log('Movie rating error:', err.message);
    });
};

export default postRating;
