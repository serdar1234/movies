import { useState } from 'react';
import { Tag } from 'antd';

import MovieFetcher from '../../services/MovieFetcher.js';

import TestImg from '/asd.png';
import './MovieCard.css';

function MovieCard() {
  const [posterImage, setImage] = useState(TestImg);
  const [cardTitle, setTitle] = useState(null);
  const [cardText, setText] = useState(null);

  const movieGetter = new MovieFetcher();
  const updateTitle = () => {
    movieGetter.getData('return').then((data) => {
      setTitle(data[0]);
      setText(data[1]);
      setImage(`https://image.tmdb.org/t/p/w500${data[2]}`);
    });
  };
  updateTitle();
  return (
    <div className="card">
      <div className="cardImg">
        <img src={posterImage} alt="test" className="imgStyle" />
      </div>
      <div className="cardInfo">
        <h5>{cardTitle}</h5>
        <div className="movieDate">March 5, 2020</div>
        <Tag>Action</Tag>
        <Tag>Drama</Tag>
        <p>
          {cardText}
          {/* A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ... */}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
