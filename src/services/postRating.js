/* eslint-disable no-console */

import fetchOptions from './fetchOptions';

const postRating = (value, movieID) => {
  const storedRatings = JSON.parse(localStorage.getItem('myRatings'));
  const myRatings = JSON.stringify({ ...storedRatings, [movieID]: value });
  localStorage.setItem('myRatings', myRatings);

  const sessionID = localStorage.getItem('guest_session_id');
  console.log('Guest Session ID:', sessionID);
  const optionsWithValue = {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ value }),
    headers: { ...fetchOptions.headers, 'Content-Type': 'application/json;charset=utf-8' },
  };
  console.log(optionsWithValue);

  fetch(`https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${sessionID}`, optionsWithValue)
    .then((res) => res.json())
    .then((data) => console.log(data.success))
    .catch((err) => console.log('Error:', err.message));
};

export default postRating;
