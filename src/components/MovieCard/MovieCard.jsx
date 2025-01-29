import { Tag } from 'antd';

import TestImg from '/asd.png';
import './MovieCard.css';

function MovieCard() {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={TestImg} alt="test" className="imgStyle" />
      </div>
      <div className="cardInfo">
        <h5>The Way Back</h5>
        <div className="movieDate">March 5, 2020</div>
        <Tag>Action</Tag>
        <Tag>Drama</Tag>
        <p>
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
